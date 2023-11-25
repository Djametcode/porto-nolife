import axios from "axios";
import Cookies from "js-cookie";

const commentPostHandler = async (postId: string, commentText: string) => {
  try {
    const response = await axios.post(
      `https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/post/comment-post/${postId}`,
      { commentText: commentText },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { commentPostHandler };
