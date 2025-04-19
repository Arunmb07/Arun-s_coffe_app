// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/arunscoffee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const OrderSchema = new mongoose.Schema({
  name: String,
  coffeeType: String,
  payment: String,
});

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.send('Registered successfully');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) res.send({ success: true });
  else res.status(401).send({ success: false, message: 'Invalid credentials' });
});

app.post('/order', async (req, res) => {
  const { name, coffeeType, payment } = req.body;
  const order = new Order({ name, coffeeType, payment });
  await order.save();
  res.send('Order placed successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
