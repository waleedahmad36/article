import Article from '../models/articleModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Create a new article with image upload

export const createArticle = async (req, res) => {
    const { title, content, code, link, bold, italic } = req.body;
    const images = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : [];

    try {
        const newArticle = new Article({
            title,
            content,
            images,
            code,
            link,
            bold,
            italic,
        });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all articles
export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch articles', error });
    }
};
