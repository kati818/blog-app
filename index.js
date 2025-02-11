import express from "express";
import bodyParser from "body-parser";
//import ServerlessHttp from "serverless-http";
import methodOverride from "method-override";

const app = express();
const port = 3000;
let posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.post("/submit", (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    createdAt: new Date(),
  };

  posts.push(newPost);

  res.redirect("/");
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/allposts", (req, res) => {
  res.render("allposts.ejs", { posts });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("editPost.ejs", { post });
});

app.put("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;

  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).send("Post not found");
  }

  posts[postIndex].title = title;
  posts[postIndex].content = content;

  res.redirect("/");
});

app.delete("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).send("Post not found");
  }

  posts.splice(postIndex, 1);

  res.redirect("/");
});

app.get("/resetpassword", (req, res) => {
  res.render("password-recovery.ejs");
});

app.post("/resetpassword", (req, res) => {
  res.redirect("/login");
});
//app.use("./netlify/functions/index.js", Router);
//ServerlessHttp(app);
