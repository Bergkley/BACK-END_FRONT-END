const jwt = require("jsonwebtoken"); 
const dotenv = require('dotenv');
dotenv.config();

const createUserToken = (user, req, res) => {
  const token = jwt.sign(
    { name: user.name, id: user.id },
    `${process.env.JWT_SECRET}`,
  );

  res
    .status(200)
    .json({ message: "Você está autenticado.", token: token, userId: user._id });
};

module.exports = createUserToken;
