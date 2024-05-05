const { PrismaClient } = require("@prisma/client");
const { PasswordHashing } = require("../helpers/password.helper");
const prisma = new PrismaClient();

exports.getAllUser = async (_, res) => {
  try {
    const dataUser = await prisma.user.findMany();
    res
      .status(200)
      .json({ message: "Success get all data user", data: dataUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.addUser = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: await PasswordHashing(req.body.password),
      username: req.body.username,
      role: req.body.role ?? "user",
    };
    await prisma.user.create({data: data});
    res.status(200).json({ message: "Success create data user", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const data = {
      email: req.body.email,
      password: await PasswordHashing(req.body.password),
      username: req.body.username,
      role: req.body.role ?? "user",
    };
    await prisma.user.update({ where: { id: id }, data: data });
    res.status(200).json({ message: "Success update data user", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found", data: null });
    }
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "Success update data user", data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};
