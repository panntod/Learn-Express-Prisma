const bodyParser = require("body-parser");
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const PORT = 8000

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`🚀 Server of cafe runs on port ${PORT}`);
});
