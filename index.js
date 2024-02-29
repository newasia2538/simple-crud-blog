import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var essays = [];
var id = 1;

app.use(express.static("public"));
app.set('views', 'views/');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', {essays : essays});
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.get('/edit:id', (req, res) => {
    var essay = essays.find(item => item.id == req.url.replace('?','').split('/edit')[1]);
    res.render('create.ejs', {essay : essay});
});

app.post('/delete/:id', (req, res) => {
    console.log(essays);
    var id = req.url.split('delete/')[1];
    essays = essays.filter(x => x.id != id);
    console.log(essays);
    res.redirect('/');
});

app.get('/:id', (req, res) => {
    var essay = essays.find(item => item.id == req.url.split('/')[1]);
    res.render('view-essay.ejs', {essay : essay});
});

app.post('/edit:id', (req, res) => {
    if(req.body){
        console.log(req.body);
        var id = req.url.split('/edit')[1];
        var index = essays.findIndex(item => item.id == id);
        console.log(index);
        essays[index].subject = req.body.subject;
        essays[index].detail = req.body.detail;
    }
    res.redirect('/');
});

app.post('/submit', (req, res) => {
    var essay = { id: id ,  subject : req.body.subject, detail : req.body.detail }
    essays.push(essay);
    id++;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });