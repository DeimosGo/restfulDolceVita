const bcrypt = require('bcrypt');

const password = 'Admin.-123';

const hashPassword = async (password)=>{
    const hash = await bcrypt.hash(password, 12);
    console.log(hash);
};

hashPassword(password);
