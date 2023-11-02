import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);

        return hashedPass
    } catch (error) {
        return error
    }
}

export { hashPassword }