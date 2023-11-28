import axios from "axios"
import Cookies from "js-cookie"

export const followUserHandler = async (target: string) => {
    const token = Cookies.get("token")
    try {
        const response = await axios.post(`https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/user/follow/${target}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        console.log(error)
    }
}