import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    photoPath: {
        type: String,
        required: true
    },
    photoFileName: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model("Developers", developerSchema);
