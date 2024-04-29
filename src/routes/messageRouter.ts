import express, {
    Request,
    Response
} from "express";
import { RingDaoMessage } from "../models";
const messageRouter = express.Router();

// Get the 25 latest messages based on proposalId
messageRouter.get("/:proposalId", async (req: Request, res: Response) => {
    try {
        const messages = await RingDaoMessage.find({
            proposalId: req.params.proposalId
        }).sort({
            date: -1
        }).limit(25);
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all the messages for a proposalId
messageRouter.get("/all/:proposalId", async (req: Request, res: Response) => {
    try {
        const messages = await RingDaoMessage.find({
            proposalId: req.params.proposalId
        });
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post a new message
messageRouter.post("/", async (req: Request, res: Response) => {
    try {
        const message = new RingDaoMessage(req.body);
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Modify a message
messageRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        await RingDaoMessage.findByIdAndUpdate(req.params.id, req.body);
        await RingDaoMessage.updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        });
        res.status(200).send("Message updated");
    } catch (error) {
        res.status(400).send(error); 
    }
}); 

// Delete a message
messageRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await RingDaoMessage.findByIdAndDelete(req.params.id);
        res.status(200).send("Message deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});

export {messageRouter};