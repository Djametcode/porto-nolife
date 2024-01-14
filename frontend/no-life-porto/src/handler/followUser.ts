import axios from "axios"
import Cookies from "js-cookie"

export const followUserHandler = async (target: string) => {
    const token = Cookies.get("token")
    try {
        const response = await axios.post(`http://localhost:3000/api/v17/no-life/user/follow/${target}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        console.log(error)
    }
}