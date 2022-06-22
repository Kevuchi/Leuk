//const bodyParser = require("body-parser");
const { query } = require("express");
const express = require("express");


const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use
    (express.json());
//server.use(bodyParser)

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {

        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    id = id + 1;
    let post = {
        author,
        title,
        contents,
        id
    }
    posts.push(post)
    return res.json(post)
})
server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;
    if (!title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    id = id + 1;
    const post = {
        author,
        title,
        contents,
        id
    }
    posts.push(post)
    return res.json(post)

})
server.get('/posts', (req, res) => {
    const { term } = req.query;
    // let results = posts;
    if (term !== undefined) {
        return res.json(
            posts.filter((post) =>
                post.title.includes(term) || post.contents.includes(term)
            )
        )

    }

    res.json(posts)

})
server.get('/posts/:author', (req, res) => {
    // const { author } = req.params;
    // const authorPosts = posts.filter((post) => post.author === author);
    // if (!authorPosts.lenght) {
    //     return res
    //         .status(STATUS_USER_ERROR)
    //         .json({ error: "No existe ningun post del autor indicado" });
    // }
    // res.json(authorPosts);

    const { author } = req.params;
    const result = posts.filter((post) => post.author === author);

    if (!result.length) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post del autor indicado" });
    }

    res.json(result);

});
server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;
    const filteredPosts = posts.filter((post) => post.author === author && post.title === title)
    if (!filteredPosts.lenght) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post con dicho titulo y autor indicado" });
    }
    res.json(filteredPosts);

})
server.delete('/posts', (req, res) => {
    const { id } = req.body
    if (typeof id !== 'number') {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: 'Mensaje de error' })
    }
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(STATUS_USER_ERROR).json({
            error: "No existe el Post con dicho id",
        });
    }

    posts.splice(posts.indexOf(post), 1);

    res.json({ success: true });


})
server.delete('/author', (req, res) => {
    const { author } = req.body
    if (!author) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: 'error error error' })
    }
    let deletedPosts = [];
    let otheAuthorPosts = [];
    for (i = 0; i < posts.length; i++) {
        let post = posts[i]
        if (post.author === author) {
            deletedPosts.push(post)
        } else {
            otheAuthorPosts.push(post)
        }
    }
    if (!deletedPosts.length) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe el autor indicado" })
    }
    posts = otheAuthorPosts;
    return res.json(deletedPosts)


})
server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body
    if (!id || !title || !contents) {
        return res.status(STATUS_USER_ERROR).send({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }
    let foundPost = posts.find(post => post.id == Number(id))
    // let foundPost = posts[posts.indexOf(Number(id))]
    if (!foundPost || foundPost == undefined) {

        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }
    foundPost.title = title
    foundPost.contents = contents

    return res.status(200).json(foundPost)

})



module.exports = { posts, server };
