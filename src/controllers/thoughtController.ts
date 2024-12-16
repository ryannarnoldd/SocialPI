import Thought from '../models/Thought.js';
import User from '../models/User.js';
import { Request, Response } from 'express';

// Gets all thoughts.
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Gets thought from thoughId.
export const getOneThought = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({
            _id: _req.params.thoughtId
        });

        if (!thought) {
            res.status(404).json({ message: `No current thought from ID: ${_req.params.thoughtId}` });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Creates thought.
export const createThought = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.create(_req.body);
        const user = await User.findOneAndUpdate(
            {_id: _req.body.userId},
            {$addToSet: {thoughts: thought._id}},
            {new: true}      
        );
        if (!user) {
            return res.status(404).json({
                message: 'Thought thunked. But no user with that Id found'
            })
        }
        res.json('You Thunked A Thought!');
        return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
}

export const updateThought = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: _req.params.thoughtId},
            {$set: _req.body},
            {runValidators: true, new: true}
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought. Head Empty!' });
        }
        res.json(thought);
        return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
}

export const deleteThought = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: _req.params.thoughtId });

        if (!thought) {
        return res.status(404).json({ message: 'No thoughts. Head Empty.' });
        }
        res.json({ message: 'Thought deleted!' })
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

export const createReaction = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: _req.params.thoughtId},
            {$addToSet : { reactions: _req.body} },
            {runValidators: true, new: true}
        );
        if (!thought) {
            res.status(404).json({ message: 'No Thoughts. Head Empty.'});
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export const deleteReaction = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: _req.params.thoughtId},
            {$pull: {reactions: {reactionId: _req.params.reactionId}}},
            {runValidators: true, new: true}
        );
        if (!thought) {
            res.status(404).json({ message: 'No Thoughts. Head Empty.'});
        }
        res.status(200).json({ message: 'Thought forgotten.'});
    }
    catch (err) {
        res.status(500).json(err);
    } 
}