const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Specific post
router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
});

// Delete post
router.delete('/:postId', async(req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json(err);
    }

});

// Update post
router.patch('/:postId', async(req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate({ _id: req.params.postId }, { $set: { title: req.body.title } }, { useFindAndModify: false });
        res.json(updatedPost);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;