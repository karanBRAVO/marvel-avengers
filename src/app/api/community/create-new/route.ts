import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/DB/connect";
import { UserModel } from "@/lib/DB/models/user.model";
import { ClubModel } from "@/lib/DB/models/club.model";
import { Club } from "@/lib/DB/models-interface/interface";
import { currentUser } from "@/lib/server-session";

interface JsonRequest {
  name: string;
  image: string | undefined;
}

interface Session {
  user: {
    name: string;
    email: string;
  };
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await currentUser();
    if (!session) throw new Error(`Not authenticated`);

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await UserModel.findOne({
      name: (session as Session).user.name,
      email: (session as Session).user.email,
    });
    if (!user) throw new Error(`User not found`);

    // get the new club data
    const { name, image }: JsonRequest = await req.json();
    if (!name || !image) throw new Error(`All fields are required`);

    // checking if the club already exists
    const exists: Club | null = await ClubModel.findOne({ name });
    if (exists) throw new Error(`Club already exists`);

    // create a new club
    const newClub = new ClubModel({
      name,
      image,
      users: [user?._id],
    });
    await newClub.save();

    return NextResponse.json({
      success: true,
      message: "Created new Club successfully",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
