import { connectToDB } from "@/lib/DB/connect";
import { UserModel } from "@/lib/DB/models/user.model";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const handleSignIn = async ({
  name,
  email,
  password,
  image,
  method,
}: {
  name: string;
  email: string;
  password: string;
  image: string | undefined;
  method: string;
}) => {
  try {
    // converting name to lower case
    name = String(name).toLowerCase();

    // connect to database
    await connectToDB();

    // login user if exists
    const user = await UserModel.findOne({ email });
    if (user) {
      // matching previous method and current method of authentication
      if (method !== user.method) {
        throw new Error(`Authentication method ${method}`);
      }

      let userData = {
        id: user._id,
        name: name,
        email,
        image: user.image,
      };

      return {
        success: true,
        message: `User found.`,
        userData,
      };
    }

    // generating new password if not provided
    if (!password) {
      password = crypto.randomBytes(16).toString("hex");
    }

    if (!image) image = undefined;

    // create new user if do not exists
    await new UserModel({
      name,
      email,
      password: bcryptjs.hashSync(password, 10),
      image,
      method,
    }).save();

    const newUser = await UserModel.findOne({ email });
    let userData = {
      id: newUser?._id,
      name,
      email,
      image: newUser?.image,
    };

    return {
      success: true,
      message: `User created.`,
      userData,
    };
  } catch (error: any) {
    return { success: false, error: error?.message };
  }
};
