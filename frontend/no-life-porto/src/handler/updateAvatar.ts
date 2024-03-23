import axios from "axios"
import Cookies from "js-cookie"

export default async function updateAvatar(file: File) {
    try {
        const item = new FormData()
        item.append('avatar', file as Blob)
        const response = await axios.patch('https://porto-nolife-backend.vercel.app/api/v17/no-life/user/update-avatar', item, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })

        return response
    } catch (error) {
        return error
    }
}