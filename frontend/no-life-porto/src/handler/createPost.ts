import axios from "axios"
import Cookies from "js-cookie"

interface IData {
    postText: string,
    file: File | null
}
const createPostHandler = async (data: IData) => {
    const check = data.file === null
    console.log(check)
    try {
        if (check) {
            const response = await axios.post('https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/post/create-post', { postText: data.postText }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            return response.data
        } else {
            const response = await axios.post('https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/post/create-post', { postText: data.postText, file: data.file }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export { createPostHandler }