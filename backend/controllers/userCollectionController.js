import mongoose from 'mongoose';
import PlantCaches from '../models/plantCacheModel.js';
import UserCollections from '../models/userCollectionModel.js';

const buildSort = (sortBy, order) => {
    const sortDirection = order === 'desc' ? -1 : 1;
    const map = {
        commonName: { commonName: sortDirection },
        scientificName: { scientificName: sortDirection },
        family: { 'family.common_name': sortDirection },
        answeredAt: { 'collection.answeredAt': sortDirection },
        guessesUsed: { 'collection.guessesUsed': sortDirection },
        collected: { collected: sortDirection }
    };
    return map[sortBy] || map.commonName;
};

export const getUserCollection = async (req, res) => {
    try {
        const userId = req.user.userId;
        const sortBy = req.query.sortBy || 'commonName';
        const order = req.query.order === 'desc' ? 'desc' : 'asc';
        const searchTerm = (req.query.search || '').trim();
        const collectedFilter = req.query.collected || 'all';

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const lookupStage = {
            $lookup: {
                from: 'usercollections',
                let: { plantId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$plant', '$$plantId'] },
                                    { $eq: ['$user', userObjectId] }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            user: 0,
                            __v: 0,
                            createdAt: 0,
                            updatedAt: 0
                        }
                    }
                ],
                as: 'collection'
            }
        };

        const addFieldsStage = {
            $addFields: {
                collection: { $arrayElemAt: ['$collection', 0] },
                collected: {
                    $gt: [{ $size: { $ifNull: ['$collection', []] } }, 0]
                }
            }
        };

        const filterStages = [];

        if (searchTerm) {
            const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedTerm, 'i');
            filterStages.push({
                $match: {
                    $or: [
                        { commonName: regex },
                        { scientificName: regex }
                    ]
                }
            });
        }

        if (collectedFilter === 'collected') {
            filterStages.push({ $match: { collected: true } });
        } else if (collectedFilter === 'uncollected') {
            filterStages.push({ $match: { collected: false } });
        }

        const projectStage = {
            $project: {
                trefleId: 1,
                slug: 1,
                commonName: 1,
                scientificName: 1,
                family: 1,
                imageUrl: 1,
                collected: 1,
                collection: 1
            }
        };

        const sortStage = { $sort: buildSort(sortBy, order) };

        const pipeline = [lookupStage, addFieldsStage];
        if (filterStages.length) pipeline.push(...filterStages);
        pipeline.push(projectStage, sortStage);

        const plants = await PlantCaches.aggregate(pipeline);
        const totalItems = plants.length;

        return res.status(200).json({
            data: plants,
            totalItems
        });
    } catch (error) {
        console.error('Error fetching user collection:', error.message);
        res.status(500).json({ errorMessage: 'Failed to fetch collection.' });
    }
};

export const getUserCollectionItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const plantId = req.params.plantId;

        if (!mongoose.isValidObjectId(plantId)) {
            return res.status(400).json({ message: 'Invalid plant id.' });
        }

        const plant = await PlantCaches.findById(plantId).select(
            'trefleId slug commonName scientificName family imageUrl trefleData'
        );
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found.' });
        }

        const collection = await UserCollections.findOne({
            user: userId,
            plant: plantId
        }).select('-user -__v');

        return res.status(200).json({
            plant,
            collected: !!collection,
            collection
        });
    } catch (error) {
        console.error('Error fetching collection item:', error.message);
        res.status(500).json({ errorMessage: 'Failed to fetch collection item.' });
    }
};
