import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let todos = [];

app.get("/", (req, res) => {
    res.render("index", { todos: todos });
});

app.post("/add", (req, res) => {
    const { task } = req.body;
    if(task) 
        todos.push({id: Date.now(), text: task, completed: false});
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const removedId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== removedId);
    res.redirect("/");
});

app.post("/toggle/:id", (req, res) => {
    const currentId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === currentId);
    if (todo) todo.completed = !todo.completed;
    res.redirect("/");
});

app.listen(port, () => {
    console.log("App running on port "+port);
});