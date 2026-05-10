import mongoose from 'mongoose';

const gameRoundSchema = new mongoose.Schema({
    plant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlantCache',
        required: true
    },
    playDate: {
        type: Date,
        required: true,
        unique: true
    },
    isCurrent: {
        type: Boolean,
        required: true
    },
    hints: {
        type: [String],
        default: []
    }
});

export default mongoose.model("GameRounds", gameRoundSchema);