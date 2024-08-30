const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User'); // Adjust the path if needed

const app = express();
const port = 5002; // Port for auth service

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://database:27017/authdb', { // Updated connection string
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Route to create a new user
app.post('/api/register', async (req, res) => {
    try {
        const { emailadd, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email: emailadd });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: emailadd,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ success: true, message: 'User created' });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Route to login a user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Auth service listening on port ${port}`);
});
