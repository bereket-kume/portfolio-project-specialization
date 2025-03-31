import * as bcrypt from 'bcrypt';

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Hashed password:', hash);
}

// Replace 'your-password' with the password you want to use
hashPassword('your-password'); 