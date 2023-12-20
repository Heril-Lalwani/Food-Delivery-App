const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://herillalwani:JwGNG6RynTzOuOc4@cluster0.u8sr1xq.mongodb.net/fooddb?retryWrites=true&w=majority';
// 'mongodb+srv://herillalwani:JwGNG6RynTzOuOc4@cluster0.u8sr1xq.mongodb.net/fooddb?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const fetch_data = mongoose.connection.db.collection("food_item");

        global.food_items = await fetch_data.find({}).toArray();
        console.log(global.food_items);
        const fetch_data_cat = mongoose.connection.db.collection("foodcategory");
        global.food_items_cat = await fetch_data_cat.find({}).toArray();
            // console.log(global.food_items);
        
    } catch (error) {
        console.error("Connection error:", error);
    }
};

module.exports = mongoDB;


