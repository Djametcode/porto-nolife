import axios from "axios";
import Cookies from "js-cookie";

export const getAllPostHandler = async () => {
  const token = Cookies.get("token");

  if (!token) {
    return "Token not found";
  }
  try {
    const response = await axios.get(
      "https://porto-nolife-backend.vercel.app/api/v17/no-life/post/get-all-post",
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
