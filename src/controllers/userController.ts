import User from '../models/User.js';
import { Request, Response } from 'express';

// Gets all users.
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Gets user based on userId
export const getUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.findOne(
            { _id: _req.params.userId }
        );

        if (!user) { res.status(404).json({ message: `No current user with ID: ${_req.params.userId}` }); } 
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Creates user.
export const createUser = async (_req: Request, res: Response) => {
    try {
        const userData = await User.create(_req.body);
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Updates users, if found.
export const updateUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: _req.params.userId},
            {$set: _req.body},
            {runValidators: true, new: true}
        );

        if (!user) { res.status(404).json({ message: `No current user with ID: ${_req.params.userId}` }); } 
        res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
}

// Deletes users, if found.
export const deleteUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete(
            {_id: _req.params.userId}
        );

        if (!user) { res.status(404).json({ message: `No current user with ID: ${_req.params.userId}` }); } 
        res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
}

// Adds Friend from user.
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet : { friends: req.body.friendId} },
            {runValidators: true, new: true}
        );
        const friend = await User.findOneAndUpdate(
            { _id: req.body.friendId },
            { $addToSet: { friends: req.params.userId } },
            { runValidators: true, new: true }
        );

        if (!user || !friend) { res.status(404).json({ message: 'User and/or friend not found!'}); }
        res.status(200).json({message: 'Friend added!.'});
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// Deletes user, if found.
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull : { friends: req.params.friendId} },
            {runValidators: true, new: true}
        );
        const friend = await User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } },
            { runValidators: true, new: true }
        );

        if (!user || !friend) { res.status(404).json({ message: 'User and/or friend not found!'}); }
        res.status(200).json({message: 'Friend removed.'});
    }
    catch (err) {
        res.status(500).json(err);
    }
}