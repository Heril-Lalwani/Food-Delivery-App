const express = require("express");
const router = express.Router();


router.post("/foodData",(req,res)=>{
    // console(global.food_items);
    try{
        console.log(global.food_items);
        res.send([global.food_items,global.food_items_cat])
    }
    catch(error){
        console.error(error.message  );
        res.send("Server Error");
    }
});
module.exports=router;