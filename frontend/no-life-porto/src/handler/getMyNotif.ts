import axios from "axios"
import Cookies from "js-cookie"

export default async function getMyNotifcation() {
    try {
        const response = await axios.get('http://localhost:3000/api/v17/no-life/user/get-my-notif', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })

        return response.data
    } catch (error) {
        return error
    }
}