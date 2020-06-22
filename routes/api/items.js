const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Todo = require("../../models/Todo");

// @route api/items
// @desc Fetch user data
// @access Private -> comes only after successful login
router.get("/", (req, res) => {
    Todo.find()
        .sort({ date: 1 })
        .then((items) => res.json(items));
});

// @route api/items
// @desc Add a Todo
// @access Private
router.post("/", auth, (req, res) => {
    if (req.body.title === "" && req.body.content === "") {
        errors = { content: "No title or description provided", title: "" };
        return res.status(400).json(errors);
    }

    const newItem = new Todo({
        title: req.body.title,
        content: req.body.content,
    });
    // both empty entry is invalid -> ADD THAT
    newItem.save().then((item) => res.json(item));
});

// @route api/items
// @desc Delete a todo
// @ access Private
router.delete("/:id", auth, (req, res) => {
    Todo.findById(req.params.id).then((item) =>
        item
            .remove()
            .then(() => res.json(item))
            .catch((err) => res.status(404).json({ success: false }))
    );
});

// @route api/items
// @desc Edit a todo
// @access Private
router.put("/:id", auth, (req, res) => {
    if (req.body.title === "" && req.body.content === "") {
        errors = { content: "No title or description provided", title: "" };
        return res.status(400).json(errors);
    }

    const query = { _id: req.params.id };

    Todo.findOneAndUpdate(query, req.body)
        .then(() => res.json(req.body))
        .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
