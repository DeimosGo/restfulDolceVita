const bcrypt = require('bcrypt');

const verifyPassword = async (password, hash)=>{
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
};

module.exports = verifyPassword;
