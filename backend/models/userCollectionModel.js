import mongoose from "mongoose";

const userCollectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Typess.ObjectId,
        ref: 'Users',
        required: true
    },
    plant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlantCaches',
        required: true
    },
    gameRound: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameRounds',
        required: true
    },
    guessesUsed: {
        type: Number, 
        default: 0
    },
    timeSeconds: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean, 
        default: false
    },
    answeredAt: {
        type: Date
    }
},
{
    timestamps: true
});

userCollectionSchema.index({ user: 1, gameRound: 1}, { unique: true })

export default mongoose.model("UserCollections", userCollectionSchema);