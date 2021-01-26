const bcrypt = require("bcryptjs")

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const profile_pic = `https://robohash.org/${username}.png`;

    const db = req.app.get("db");
    const [result] = await db.user.find_user_by_username(username);

    if (result) {
      return res.status(403).send("Username not available");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    [registeredUser] = await db.user.create_user([username, hash, profile_pic]);

    req.session.user = registeredUser;
    return res.status(201).send(req.session.user);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");

    const [foundUser] = await db.user.find_user_by_username(username);

    if (!foundUser) {
      return res
        .status(401)
        .send("Username not found, please create new account");
    }
    const authenticated = bcrypt.compareSync(password, foundUser.password);
    if (!authenticated) {
      return res.status(403).send("incorrect password");
    }
    delete foundUser.password;

    req.session.user = foundUser;
    res.status(202).send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (!req.session.user) {
      return res.sendStatus(401);
    }
    return res.status(200).send(req.session.user);
  }
};
