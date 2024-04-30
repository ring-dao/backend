import express, {
    Request,
    Response
} from "express";
import { Topic } from "../models";
import { checkRingSignature, checkRingSignatureWithOwner, tokenAddress } from "../utils";

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

// Get a topic by custom id (not MongoDB's _id)
topicRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findOne({ id: req.params.id });
        if (!topic) {
            return res.status(404).send("Topic not found");
        }
        res.status(200).send(topic);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post a new topic
topicRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newTopic = new Topic(req.body);
        await newTopic.save();
        res.status(201).send(newTopic);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a topic by custom id
topicRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findOne({ id: req.params.id });
        if (!topic) {
            return res.status(404).send("Topic not found");
        }
        await checkRingSignatureWithOwner(req.body.ringSignature, topic.ownerkeyImage, tokenAddress);
        await Topic.deleteOne({ id: req.params.id });
        res.status(200).send("Topic deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});

topicRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findOne({ id: req.params.id });
        if (!topic) {
            return res.status(404).send("Topic not found");
        }
        await checkRingSignatureWithOwner(req.body.ringSignature, topic.ownerkeyImage, tokenAddress);
        const result = await Topic.updateOne({ id: req.params.id }, { $set: req.body.topic });
        if (result.modifiedCount === 0) {
            throw new Error("No updates performed");
        }
        res.status(200).send("Topic updated");
    } catch (error) {
        res.status(400).send(error);
    }
}); 
export { topicRouter };
