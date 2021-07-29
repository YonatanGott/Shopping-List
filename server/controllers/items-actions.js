const ListItem = require('../models/list-item')


const createItem = async (req, res) => {
    try {
        const { name, notes } = req.body;
        const newItem = new ListItem({
            name,
            notes
        });
        await newItem.save(function (err, newItem) {
            if (err) return console.error(err);
        });
        res.json({ message: "Created the List Item.", createItem: newItem });
    } catch (error) {
        console.log(error);
        res.json({ message: "Failed To Create List Item.", createItem: newItem });
    }
};

const getItems = async (req, res) => {
    try {
        const items = await ListItem.find().sort('-time');
        res.json({
            items
        })
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Failed To Get List Items." });
    }
};

const updateItem = async (req, res) => {
    try {
        const { name, notes, id } = req.body;
        const updateItem = await ListItem.findById(id);
        updateItem.set({
            name: name,
            notes: notes,
        });
        await updateItem.save();
        res.json({ message: "Updated the List Item.", updateItem: updateItem });
    } catch (error) {
        console.log(error);
        res.json({ message: "Failed To Update List Item.", updateItem: updateItem });
    }
};

const deleteItem = async (req, res) => {
    try {
        const id = req.body.id;
        const deletedItem = await ListItem.findByIdAndDelete(id);
        res.json({ message: "Deleted the List Item.", deletedItem: deletedItem });
    } catch (error) {
        console.log(error);
        res.json({ message: "Failed To Delete List Item.", deletedItem: deletedItem });
    }
};

module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem
}