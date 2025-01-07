const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const apiToken = process.env.TG_API_TOKEN;

app.use(express.json());

const corsOptions = {
  origin: 'https://investcafe.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const usersDb = mongoose.connection.useDb('Users');
const drinksDb = mongoose.connection.useDb('DrinksLogger');

const usersSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
});

const drinkSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

const Users = usersDb.model('Users', usersSchema);
const Drink = drinksDb.model('Drink', drinkSchema);

app.get('/', (req, res) => {
  res.json('Hello');
  res.send('Server is working');
  console.log(res.status);
  console.log(req);
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await Users.findOne({ login });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    if (user.password === password) {
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/sendMessage', async (req, res) => {
  try {
    const { chat_id, text } = req.body;

    const response = await fetch(
      `https://api.telegram.org/bot${apiToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ chat_id, text }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      res.status(200).send('Message sent successfully');
    } else {
      res.status(400).send('Failed to send message');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/drinks', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const drink = new Drink({ name, quantity });
    await drink.save();
    res.status(201).json(drink);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/drinks', async (req, res) => {
  try {
    const filter = req.query.filter;
    let query = {};

    if (filter) {
      const now = new Date();
      let startDate;
      switch (filter) {
        case 'day':
          startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString();
          break;
        case 'week':
          startDate = new Date(
            now.setDate(now.getDate() - now.getDay())
          ).toISOString();
          break;
        case 'month':
          startDate = new Date(now.setDate(1)).toISOString();
          break;
        case 'year':
          startDate = new Date(now.setMonth(0, 1)).toISOString();
          break;
        default:
          startDate = new Date(0).toISOString();
      }
      query.date = { $gte: new Date(startDate) };
    }

    const drinks = await Drink.find(query);
    res.status(200).json(drinks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/drinks/summary', async (req, res) => {
  try {
    const { filter } = req.query;
    let matchStage = {};
    if (filter) {
      const now = new Date();
      let startDate;
      switch (filter) {
        case 'day':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          break;
        case 'month':
          startDate = new Date(now.setDate(1));
          break;
        case 'year':
          startDate = new Date(now.setMonth(0, 1));
          break;
        default:
          startDate = new Date(0);
      }
      matchStage.date = { $gte: startDate };
    }

    const summary = await Drink.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$name',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
    ]);
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
