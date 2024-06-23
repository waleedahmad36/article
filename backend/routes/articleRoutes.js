import express from 'express';
import {
    createArticle,
    getArticles,
} from '../controllers/articleController.js';
import upload from '../utils/upload.js';  

const router = express.Router();


router.post('/create', upload.array('images', 10), createArticle);


router.get('/articles', getArticles);



export default router;
