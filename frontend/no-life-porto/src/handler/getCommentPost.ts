import axios from "axios";
import Cookies from "js-cookie";

export const getCommentPost = async (postId: string) => {
  try {
    const response = await axios.get(
      `https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/post/comment/${postId}`,
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
