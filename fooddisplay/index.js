const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Food = require('./models/Food'); // Ensure this path is correct

const app = express();
const port = 5001; // Port for food data service

app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://database:27017/fooddb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Route to get food data
app.get('/api/foodData', async (req, res) => {
    try {
        const foodItems = await Food.find().exec();
        res.status(200).json(foodItems);
    } catch (error) {
        console.error("Error fetching food data:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// Route to add new food data
app.post('/api/foodData', async (req, res) => {
    try {
        const { foodName, price, category } = req.body;

        const food = new Food({
            foodName,
            price,
            category
        });

        await food.save();

        res.status(201).json({ message: 'Food created' });
    } catch (error) {
        console.error("Error creating food data:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Food data service listening on port ${port}`);
});
