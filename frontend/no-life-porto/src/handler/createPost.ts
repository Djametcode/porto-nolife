import axios from "axios";
import Cookies from "js-cookie";

interface IData {
  postText: string;
  file: File | null;
}

const createPostHandler = async (data: IData) => {
  try {
    const item = new FormData();
    item.append("postText", data.postText);

    if (data.file !== null) {
      item.append("file", data.file as Blob);
    }

    const response = await axios.post(
      "http://localhost:3000/api/v17/no-life/post/create-post",
      item,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createPostHandler };
