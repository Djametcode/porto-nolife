import bcrypt from 'bcrypt'

interface IDatabase {
    databasePass: string;
    plainPass: string;
}

const comparePass = (data: IDatabase) => {
    const isMatch = bcrypt.compare(data.plainPass, data.databasePass)
    return isMatch
}

export { comparePass }