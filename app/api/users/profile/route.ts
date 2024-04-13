import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
connect();

export async function PUT (request:NextRequest){
    try {
       const reqBody = await request.json();
       const {userName, userEmail, password} = reqBody;
       const userId = getDataFromToken(request);
       const Finduser = await User.findById(userId);
       if(Finduser){
        Finduser.name = userName || Finduser.name;
        Finduser.email = userEmail || Finduser.email;
       }
       if(password){
                // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        Finduser.password = hashedPassword;
       }
       await Finduser.save();

       const response = NextResponse.json({
        message: 'User Updated',
        success: true
       })
    return response
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}