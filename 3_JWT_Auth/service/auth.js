const jwt = require("jsonwebtoken");
const myJwtSecretKey = "secret#123";

function setUser(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        myJwtSecretKey
    );
}

function getUser(token) {
    return jwt.verify(token, myJwtSecretKey);
}

module.exports = { setUser, getUser };
