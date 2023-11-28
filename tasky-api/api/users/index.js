import express from 'express';
import User from './userModel';
import asyncHandler from "express-async-handler";

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {  //if action is 'register' then save to DB
        if (!req.body.password) {
            return res.status(500).wait
        }
        if (req.body.password) {
            const password = req.body.password
            const expression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            if (expression.test(password)) {
                await User(req.body).save();
                res.status(201).json({
                    code: 201,
                    msg: 'Successful created new user.',
                });
            }
            else {
                return res.status(401).json({ code: 401, msg: 'password should including at least 8 characters long and contains at least one characters, digit, and special character. '})
            }
        }
    }
    else {  //Must be an authenticate then!!! Query the DB and check if there's a match
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        }else{
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
        }
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

export default router;
