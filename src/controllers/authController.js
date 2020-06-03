const User = require("../models/User");

// JWT
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async function signin(req, res, next) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "The email doesn't exists" });
      }

      let validPass = await user.validatePassword(password); // metodo creado en modelo User
      // console.log(validPass);
      if (!validPass) {
        return res.status(404).json({ auth: false, token: null });
      }

      let token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
        expiresIn: 24 * 60 * 60, // conversion de 24 HRS a segundos
      });
      res.status(200).json({ auth: true, token });
    } catch (error) {
      console.log(e);
      res.status(500).send("There was a problem registering your user");
    }
  },

  signup: async function (req, res, next) {
    let { userName, email, password } = req.body;
    let user = new User({
      userName, // userName: userName,
      email, // email: email
      password, //pasword: password
    });
    user.password = await user.encryptPassword(user.password); // funcion definida en el modelo User
    await user.save();

    let token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: 24 * 60 * 60, // conversion de 24 HRS a segundos
    });

    res.status(200).json({ auth: true, token });
  },

  me: async function (req, res, next) {
    // console.log(decoded);
    let user = await User.findById(req.userId, { password: 0 }); // el middlerare verifyToken escribe userId
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json(user);
  },
};
