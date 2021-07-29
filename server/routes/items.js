const express = require('express')
const router = express.Router()
const {
    getItems,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/items-actions')


// Get All Items
router.get("/", getItems);

// Create An Item
router.post("/", createItem);

// Update An Item
router.patch("/", updateItem);

// Remove An Item
router.delete("/", deleteItem);


module.exports = router;