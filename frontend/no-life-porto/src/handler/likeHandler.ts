import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";

export const likePostHandler = async (
  postId: string,
  counter: number,
  setCounter: Dispatch<SetStateAction<number>>
) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/post/like-post/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCounter(counter + 1);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
