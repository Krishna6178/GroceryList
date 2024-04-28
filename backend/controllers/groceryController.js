const asyncHandler =require('express-async-handler');
const  Room = require('../models/room')
const Item = require('../models/items')

const getAllGroceryData = asyncHandler(async (req, res) => {
    const data = await Room.find({});
    res.status(200).json(data);
})

const getGroceryDataByRoom = asyncHandler(async (req, res) => {
    const { room } = req.params;

    if (!room) {
        res.status(400);
        throw new Error("Please provide a room number");
    }

    try {
        const data = await Room.findOne({ room: room });

        if (!data) {
            res.status(404);
            throw new Error(`Data for room ${room} not found`);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const setGroceryData = asyncHandler(async (req, res) => {
    const { room, walmart, indian } = req.body;

    if (!room || !walmart || !indian) {
        res.status(400);
        throw new Error("Please provide all the required data");
    }

    try {
        let postData;
        const existingData = await Room.findOne({ room: room });

        if (existingData) {
            // Update the existing document
            existingData.walmart = walmart;
            existingData.note = req.body.note;
            existingData.indian = indian;
            postData = await existingData.save();
        } else {
            // Create a new document
            postData = await Room.create({
                room: room,
                walmart: walmart,
                indian: indian,
                note: req.body.note
            });
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getItems = asyncHandler(async(req,res)=>{
    try {
        const result = await Item.findOne({ _id: 'singleton' });
        res.json(result);
    } catch (error) {
        console.error('Error retrieving record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const saveItems = asyncHandler(async(req,res)=>{
    const { indian, walmart } = req.body;

    try {
        const result = await Item.findOneAndUpdate(
            { _id: 'singleton' },
            { indian, walmart },
            { new: true ,upsert: true, timeout: 30000}
        );
        
        res.json(result);
    } catch (error) {
        console.error('Error adding items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   

});


const deleteAllDocuments = async () => {
    try {
        // Delete all documents in the Room collection
        const result = await Room.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
};

const deleteRoom = async () => {
    const { room } = req.body;
    try {
        // Delete all documents in the Room collection
        const result = await Room.delete({room: room});
        console.log(`${result.deletedCount} documents deleted`);
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
};

module.exports = {
    getGroceryDataByRoom,
    setGroceryData,
    deleteAllDocuments,
    deleteRoom,
    getAllGroceryData,
    getItems,
    saveItems
};