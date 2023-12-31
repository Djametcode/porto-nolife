import axios from "axios";
import Cookies from "js-cookie";

export const getCurrentUser = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      "https://porto-nolife-backend.vercel.app/api/v17/no-life/auth/current-user",
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
