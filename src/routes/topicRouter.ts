import express, {
    Request,
    Response
} from "express";
import { Topic } from "../models";
import { checkRingSignature, checkRingSignatureWithOwner,tokenAddress } from "../utils";

const topicRouter = express.Router();

// Get all topics
topicRouter.get("/", async (req: Request, res: Response) => {
    try {
        const topics = await Topic.find();
        res.status(200).send(topics);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a topic by id
topicRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findById(req.params.id);
        res.status(200).send(topic);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post a new topic
topicRouter.post("/", async (req: Request, res: Response) => {
    try {
        await checkRingSignature(req.body.ringSignature, tokenAddress);
        // need to check how we get the owner keyImage, directly in the payload or from the irng signature
        const topic = new Topic(req.body.topic);
        await topic.save();
        res.status(201).send(topic);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a topic
topicRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        // first we get the topic owner 
        const topic = await Topic.findById(req.params.id);
        await checkRingSignatureWithOwner(req.body.ringSignature, topic?.ownerkeyImage ?? "", tokenAddress);
        await Topic.findByIdAndDelete(req.params.id);
        res.status(200).send("Topic deleted");
    }
    catch (error) {
        res.status(400).send(error);
    }
});

// Modify a topic
topicRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findById(req.params.id);
        await checkRingSignatureWithOwner(req.body.ringSignature, topic?.ownerkeyImage ?? "", tokenAddress);
        await Topic.findByIdAndUpdate(req.params.id, req.body.topic);
        await Topic.updateOne({
            _id: req.params.id
        }, {
            $set: req.body.topic
        });
        res.status(200).send("Topic updated");
    } catch (error) {
        res.status(400).send(error);
    }
}); 

export { topicRouter };