const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var User = require('./models/User');
const { default: mongoose } = require('mongoose');

app.get('/registeredusers', async(req, res) => {
    const users = await User.find();
    res.status(200).send(users)
})
app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save();
    res.status(200).send({ "data": user })
})
app.post('/login', async(req, res) => {
    const userEmail = req.body.email;
    console.log(userEmail);
    const cEmail = await User.find({ email: userEmail })
    console.log(cEmail[0].password);
    const str = cEmail[0].password;
    if (str === req.body.password)
        res.status(200).send("login successful")
    else
        res.status(401).send("login unsuccessful")
})
mongoose.connect("mongodb://localhost:27017/user")
    .then(() => {
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        })

    })
    .catch((err) => {
        console.log("Error Occured");
    })