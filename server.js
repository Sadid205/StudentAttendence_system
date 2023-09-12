const express = require("express");
const connectDb = require("./db");
const routes = require('./routes')
const authenticate = require('./middleware/authenticate')



const app = express();
app.use(express.json());
app.use(routes);

/**
 * Start

name = input()

email = input()

password = input()

if name && email password is invalid:

return 400 error

user = find user with email 

if user found: 

return 400 error

hash = hash password

user =save name, email, hash to user model

return 201
 */

app.get("/private",authenticate, async (req, res) => {
  console.log(req.user)
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/public",authenticate, (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
});

app.get("/", (_, res) => {
  const obj = {
    name: "Ayman",
    email: "aymanexample@gmail.com",
  };
  res.json(obj);
});

app.use((err, req, res, next) => {
  console.log(err)
  const message = err.message ? err.message : 'Server Error Occurred';
  const status = err.status ? err.status: 500;
  res.status(status).json({ message});
});

connectDb("mongodb://127.0.0.1:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
    app.listen(4000, () => {
      console.log("I am listening on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
