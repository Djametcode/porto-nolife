import axios from "axios"

interface IData {
    email: string;
    password: string
}

export const loginHandler = async (data: IData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v17/no-life/auth/login-user', data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}