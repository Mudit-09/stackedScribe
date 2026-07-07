const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// @route   GET /api/posts
// @desc    Get all blog posts
router.get('/', async (req, res) => {
    try {
        // Fetch posts and populate the author's username (excluding their password)
        const posts = await Post.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 }); // Newest posts first
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching posts.' });
    }
});

// @route   GET /api/posts/:id
// @desc    Get a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.status(500).json({ message: 'Server error fetching the post.' });
    }
});

// @route   POST /api/posts
// @desc    Create a new blog post (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, coverImage } = req.body;

        const newPost = new Post({
            title,
            content,
            coverImage,
            author: req.user.id // Pulled directly from our auth middleware token
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error creating post.' });
    }
});

// @route   PUT /api/posts/:id
// @desc    Update an existing blog post (Protected)
router.put('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Make sure the user trying to update actually owns this post
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to edit this post.' });
        }

        const { title, content, coverImage } = req.body;

        // Update fields if they are provided in the request body
        if (title) post.title = title;
        if (content) post.content = content;
        if (coverImage !== undefined) post.coverImage = coverImage;

        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating post.' });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a blog post (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Make sure the user trying to delete actually owns this post
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this post.' });
        }

        await post.deleteOne();
        res.json({ message: 'Post removed successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting post.' });
    }
});

module.exports = router;