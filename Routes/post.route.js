const express = require("express");
const { Cursor } = require("mongoose");

const { pmodel } = require("../modle/post");
const postrouter = express.Router();

postrouter.get("/", async (req, res) => {
    try {
        const { userId } = req.body;
        const posts = await pmodel.find({ $and: [{ userId }] });
        res.status(200).send({ "msg": "your post are here", posts });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})



postrouter.post("/add", async (req, res) => {
    try {
        const pageloding = req.body;
        const newPost = new pmodel(pageloding);
        await newPost.save();
        res.status(200).send({ "msg": "Your post has been created", post: newPost })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});


postrouter.get("/top", async (req, res) => {
    try {
        const d = await pmodel.find();
        const maxcomment = d.reduce((prev, current) => {
            return prev.no_of_comments > current.no_of_comments ? prev : current;
        });
        res.status(200).send(maxcomment)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


postrouter.patch("/update/:id", async (req, res) => {
    try {
        const pageloding = req.body;
        const id = req.params.id;
        const updating = await pmodel.findByIdAndUpdate(id, pageloding);
        res.status(200).send({ "msg": "post updated" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


postrouter.delete("/delete/:id", async (req, res) => {
    try {
        const pageloding = req.body;
        const id = req.params.id;
        const deleting = await pmodel.findByIdAndDelete(id, pageloding);
        res.status(200).send({ "msg": "post deleted" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});

postrouter.get("/filet1", async (req, res) => {
    try {
        let query = {};

        if (req.query.min && req.query.max) {
            query = { no_of_comments: { $gte: Number(req.query.min), $lte: Number(req.query.max) } }
        }
        const posts=await pmodel.find(query);
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});

postrouter.get("/peginate", async (req, res) => {
    try {
        const {page,limit}=req.query;
        const skip=(page-1)*10;
        const data=await pmodel.find().skip(skip).limit(limit);
        res.send(data)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});


postrouter.get("/filter2", async (req, res) => {
    try {
       const d=await pmodel.find(req.query);
       res.status(200).send(d)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});




module.exports = {
    postrouter
}