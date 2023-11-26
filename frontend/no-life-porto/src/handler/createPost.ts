import axios from "axios";
import Cookies from "js-cookie";

interface IData {
  postText: string;
  file: File | null;
}
const createPostHandler = async (data: IData) => {
  const check = data.file === null;
  console.log(check);
  try {
    if (check) {
      const response = await axios.post(
        "http://localhost:3000/api/v17/no-life/post/create-post",
        { postText: data.postText },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return response.data;
    } else {
      const item = new FormData()
      item.append('postText', data.postText)
      item.append('file', data.file as Blob)

      const result = Object.fromEntries(item)
      const response = await axios.postForm(
        "http://localhost:3000/api/v17/no-life/post/create-post", {
        result
      },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { createPostHandler };
