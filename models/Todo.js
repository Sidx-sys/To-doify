const { mongo } = require("mongoose");

mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
