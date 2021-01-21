const bcrypt = require('bcryptjs');
module.exports={
register: async (req, res) => {
    const {username, password} = req.body;
    const profile_pic = `https://robohash.org/${username}.png`;
    const db = req.app.get('db');
    const result = await db.find_user_by_username([username])
    const existingUser = result[0];

    if (existingUser) {
        return res.status(403).send('Username not available')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    registeredUser = await db.create_user([username, hash, profile_pic]);
    const user = registeredUser[0];
    req.session.user = {
        username: user.username,
        profile_pic: user.profile_pic,
        id: user.id
    }
    return res.status(201)
},

}