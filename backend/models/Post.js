const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        coverImage: {
            type: String, // We'll store an image URL string here
            default: ''
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, // Connects the post to a specific User ID
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true // Tracks when posts are created or edited
    }
);

module.exports = mongoose.model('Post', PostSchema);