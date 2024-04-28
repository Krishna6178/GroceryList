const express = require('express');
const router = express.Router();
const {
    setGroceryData,
    getGroceryDataByRoom,
    deleteAllDocuments,
    getAllGroceryData,
    deleteRoom,
    saveItems,
    getItems
} = require('../controllers/groceryController');


router.get('/', getAllGroceryData);
router.get('/room/:room', getGroceryDataByRoom);
router.post('/', setGroceryData);
router.delete('/room/:room', deleteRoom);
router.delete('/', deleteAllDocuments);
router.post('/admin',saveItems);
router.get('/admin',getItems);

module.exports = router;