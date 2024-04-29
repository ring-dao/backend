import express, {
    Request,
    Response
} from "express";
import { RingDaoMessage } from "../models";
import { checkRingSignature, checkRingSignatureWithOwner, tokenAddress } from "../utils";

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
        await checkRingSignature(req.body.ringSignature, tokenAddress);
        // TODO need to check how we get the owner keyImage, directly in the payload or from the ring signature
        const message = new RingDaoMessage(req.body.message);
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Modify a message
messageRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const message = await RingDaoMessage.findById(req.params.id);
        await checkRingSignatureWithOwner(req.body.ringSignature, message?.ownerKeyImage ?? "", tokenAddress);
        await RingDaoMessage.findByIdAndUpdate(req.params.id, req.body.message);
        await RingDaoMessage.updateOne({
            _id: req.params.id
        }, {
            $set: req.body.message
        });
        res.status(200).send("Message updated");
    } catch (error) {
        res.status(400).send(error); 
    }
}); 

// Delete a message
messageRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const message = await RingDaoMessage.findById(req.params.id);
        await checkRingSignatureWithOwner(req.body.ringSignature, message?.ownerKeyImage ?? "", tokenAddress);
        await RingDaoMessage.findByIdAndDelete(req.params.id);
        res.status(200).send("Message deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});

export {messageRouter};