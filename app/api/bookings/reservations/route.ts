import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/bookingModel";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {car, firstname, lastname, email, number, start, end} = reqBody;

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: 'Please Login'}, {status: 400})
        }

        const newBooking = new Booking({
            userid: user._id,
            firstname,
            lastname,
            email,
            number, 
            start,
            end,
            car,
        });
        const savedBooking = await newBooking.save();
        return NextResponse.json({
            message: 'User created successfully',
            savedBooking
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}