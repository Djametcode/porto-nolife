import axios from "axios";

interface IRegist {
  username: string;
  email: string;
  password: string;
}

export const signUpHandler = async (data: IRegist) => {
  try {
    const response = await axios.post(
      "https://porto-nolife-backend.vercel.app/api/v17/no-life/auth/regist-user",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
