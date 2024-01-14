import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

export const likePostHandler = async (
  postId: string,
) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v17/no-life/post/like-post/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
