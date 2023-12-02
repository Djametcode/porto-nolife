import axios from "axios"
import Cookies from "js-cookie"

export default async function updateAvatar(file: FormData) {
    try {
        const response = await axios.patch('http://localhost:3000/api/v17/no-life/auth/update-avatar', file, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })

        return response;
    } catch (error) {
        return error
    }
}