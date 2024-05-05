const { PrismaClient } = require("@prisma/client");
const { PasswordCompare } = require("../helpers/password.helper");
const { GenerateToken } = require("../helpers/token.helpers");
const prisma = new PrismaClient();

exports.authentication = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!isExistingUser)
      return res.status(404).json({ message: "User not found", data: null });
    const isValidPassword = await PasswordCompare(password, isExistingUser.password)
    if(!isValidPassword) 
        return res.status(404).json({ message: "Incorrect Password", data: null });
    const data = {
        email: isExistingUser.email,
        role: isExistingUser.role,
        username: isExistingUser.username
    }
    const token = GenerateToken(data)
    res.locals.role = isExistingUser.role
    return res.status(200).json({message: "Login successfully", data: {...data, token: token}})
    } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Something went wrong", data: null})
  }
};
