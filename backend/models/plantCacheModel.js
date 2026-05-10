import mongoose from 'mongoose';

const plantCache = mongoose.Schema({
    trefleId: {
        type: Number,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    commonName: {
        type: String,
        required: true
    },
    scientificName: {
        type: String,
        required: true
    },
    family: {
        type: String
    },
    imageUrl: {
        type: String
    },
    trefleData: {
        type: mongoose.Schema.Types.Mixed, 
        required: true
    },
    cachedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('PlantCache', plantCacheSchema);