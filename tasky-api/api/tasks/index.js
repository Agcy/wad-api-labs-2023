import express from 'express';
import { tasksData } from './tasksData';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(tasksData);
});

export default router;