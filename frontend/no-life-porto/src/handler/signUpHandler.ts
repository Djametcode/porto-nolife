import axios from "axios"

interface IRegist {
    username: string;
    email: string;
    password: string
}

export const signUpHandler = async (data: IRegist) => {
    try {
        const response = await axios.post('https://backend-no-life-3678e78f1666.herokuapp.com//api/v17/no-life/auth/regist-user', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}