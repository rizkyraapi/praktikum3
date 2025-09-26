const express = require("express");
const app = express();
const PORT = 8001;

const TOKEN = "mysecrettoken";

function authBearer(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (token !== TOKEN) {
    return res.status(403).json({ message: 'Invalid token' });
  }
    next();
}
app.use(express.json());              
         

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/about', authBearer, (req, res) => {
  res.json([
    { id: 1, name: 'Andi', job: 'Senior Programmer' },
    { id: 2, name: 'Budi', job: 'Technical Report' },
    { id: 3, name: 'Cindy', job: 'Front-end Programmer' },
    { id: 4, name: 'Deli', job: 'UI/UX Designer' },
    { id: 5, name: 'Erlang', job: 'Marketing' },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});