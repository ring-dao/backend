import express, {
    Request,
    Response
} from "express";
import { Topic } from "../models";
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
        const topic = new Topic(req.body);
        await topic.save();
        res.status(201).send(topic);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a topic
topicRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        // TODO ADD CHECK ABOUT THE RINGSIGNATURE, whith the check about the senderKeyImage
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
        // TODO ADD CHECK ABOUT THE RINGSIGNATURE, whith the check about the senderKeyImage
        await Topic.findByIdAndUpdate(req.params.id, req.body);
        await Topic.updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        });
        res.status(200).send("Topic updated");
    } catch (error) {
        res.status(400).send(error);
    }
}); 

export { topicRouter };