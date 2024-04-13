import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Booking from "@/models/bookingModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select('-password');
        const id = user._id.toString();
        const bookings = await Booking.find({});
        const booking = bookings.filter((element) => element.userid.toString() == id);
        return NextResponse.json({
            message: 'Bookings found',
            booking,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}