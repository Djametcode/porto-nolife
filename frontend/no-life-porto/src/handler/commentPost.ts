import axios from "axios";
import Cookies from "js-cookie";

const commentPostHandler = async (postId: string, commentText: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v17/no-life/post/comment-post/${postId}`,
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
