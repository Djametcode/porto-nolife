import bcrypt from 'bcrypt';
const comparePass = (data) => {
    const isMatch = bcrypt.compare(data.plainPass, data.databasePass);
    return isMatch;
};
export { comparePass };
