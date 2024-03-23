import axios from "axios"
import Cookies from "js-cookie"

export default async function getPostById(postId: string) {
    try {
        const response = await axios.get(`https://porto-nolife-backend.vercel.app/api/v17/no-life/post/get-post/${postId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}