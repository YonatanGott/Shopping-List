const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listItem = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        time: {
            type: Date,
            default: Date.now
        },
    }, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

let ListItem = mongoose.model("ListItem", listItem);

module.exports = ListItem;