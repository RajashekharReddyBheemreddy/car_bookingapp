import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
connect();

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: 'User does not exist'},{status: 400})
        }
        // check if password matches or not
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: 'Invalid password'},{status:400})
        }

        // create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '30d'})
        const response = NextResponse.json({
            message: 'Login Successful',
            success: true
        })
        response.cookies.set('token', token, {
            httpOnly: true
        })
        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}