import mongoose from "mongoose";

const bookingModel = new mongoose.Schema({
    userid: {
        type: String,
    },
    firstname: {
        type: String,
        required:[true, "Please provide a firstname"],
    },
    lastname: {
        type: String,
        required:[true, "Please provide a lastname"],
    },
    email: {
        type: String,
        required:[true, "Please provide a email"],
    },
    number: {
        type: String,
        required:[true, "Please provide mobile number"],
    },
    start: {
        type: String,
        required:true,
    },
    end: {
        type: String,
        required: true,
    },
    car: {
        type: Object,
        required: true
    }

})

const Booking = mongoose.models.booking || mongoose.model("booking", bookingModel);

export default Booking;