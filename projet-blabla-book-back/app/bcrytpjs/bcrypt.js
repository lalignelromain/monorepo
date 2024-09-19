const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    return hashPassword;
}

async function comparePassword(password, hashPassword) {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch
}

async function test() {
    const password = "test"
    console.log("Mot de passe:", password)
    const hashedPassword = await hashPassword(password)
    console.log("Mot de passe haché:", hashedPassword)

    const isMatched = await comparePassword(password, hashedPassword)
    console.log ("Les mots de passes correspondent:", isMatched)
}

test()