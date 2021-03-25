const express = require('express');

//bring in mongoose
const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//DB CONFIG
//const mongoURI = "mongodb+srv://moss2:8253965814@cluster0.ukoeu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//const conn = mongoose.createConnection(mongoURI, {
//useCreateIndex: true,
// useNewUrlParser: true,
// useUnifiedTopology: true
//});


//db config
const connect = mongoose.connect("mongodb+srv://moss2:8253965814@cluster0.ukoeu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

//listen port


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})