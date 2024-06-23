import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: [{
        type: String, // Assuming images are stored as URLs
    }],
    code: {
        type: String, // Code field which is optional
    },
    link: {
        type: String, // Link field which is optional
    },
    bold: {
        type: Boolean, // Bold field
        default: false,
    },
    italic: {
        type: Boolean, // Italic field
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
