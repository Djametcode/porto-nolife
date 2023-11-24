import axios from "axios";
import Cookies from "js-cookie";

export const getCommentPost = async (postId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v17/no-life/post/comment/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
