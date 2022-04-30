const express = require('express');
const session = require("express-session");
const DrugRouter = require("./routes/drugs");

const path = require('path');
//creat express app using this constant vairable
const app = express();

const port = process.env.PORT || 3000;
//initalize enjine befor using it
app.set('view engine', 'ejs');

//load asset--static path
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use("/drugs", DrugRouter)

//home  route--get  request for root route
app.get('/', (req, res) => {
    //render html  page
    res.render('pages/drugs', { title: "Login System" })
});
app.listen(port, () => { console.log('listen to sever at port http://localhost:3000') }