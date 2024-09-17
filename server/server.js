const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Определение схемы и модели
const drinkSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

const Drink = mongoose.model('Drink', drinkSchema);

// Добавление напитка
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

// Получение списка напитков с фильтром
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
      { $match: matchStage }, // Применяем фильтр
      {
        $group: {
          _id: '$name', // Группируем по названию напитка
          totalQuantity: { $sum: '$quantity' }, // Суммируем количество напитков
        },
      },
      {
        $sort: { totalQuantity: -1 }, // Сортируем по убыванию общего количества
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
