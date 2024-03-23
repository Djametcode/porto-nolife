import axios from "axios"
import Cookies from "js-cookie"

export default async function getUserById(userId: string) {
    try {
        const response = await axios.get(`https://porto-nolife-backend.vercel.app/api/v17/no-life/user/get-user/${userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })

        return response.data
    } catch (error) {
        return error
    }
}