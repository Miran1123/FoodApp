let express = require("express");
//const User = require('../models/User')

const router = express.Router();


router.post('/foodData', async (req, res) => {
    try{
        //console.log(1)
        console.log(global.food_item)
        res.send([global.food_item, global.foodCategory])
    }catch(error){
        console.error(error.message)
        res.send("Server Error")
    }
})

module.exports = router;