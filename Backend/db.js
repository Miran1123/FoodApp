const mongoose = require('mongoose');

/*
mongoose.connect('mongodb://127.0.0.1:27017/foodApp')
  .then(() => console.log('Connected!')).catch((e)=>{
    console.log("notConnected")
  });
  
  let Schema = mongoose.Schema;
  let schema = new Schema(
    {
      CategoryName : {type : String},
      name : {type : String},
      img : {type : String},
      options : []
    }
  )

  const food_item = new mongoose.model("food_item", schema)

  const getDoc = async()=>{
    try{
      const ans = await food_item.find()
      console.log(ans)
    }catch(err){
      console.log(err)
    }
  }



  
   
  const mongoDB = async()=>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) =>{
      if (err) console.log("---" + err)
      else{
        console.log("connected to mongo")
        //const fetch_data = await mongoose.connection.db.collection("food_item")
        //fetch_data.find({}).toArray((err, data)=>{
          //console.log(data)
        //})
      }
    })
  }
    */

  const mongoURI = "mongodb://127.0.0.1:27017/foodApp"
  const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
      
      const foodCollection = await mongoose.connection.db.collection("food_item");
      console.log("Connected to MongoDB");
      let data = await foodCollection.find({}).toArray()
      const foodCategory = await mongoose.connection.db.collection("food_category");
        let catData  = await foodCategory.find({}).toArray()
        //console.log(catData)
      global.food_item=data;
      global.foodCategory = catData
      //onsole.log(global.food_item)

   //   foodCollection.find({}).toArray( (err, data)=>{
   //     if(err) console.log(err)
   //     else{
   //       console.log(1)
   //       console.log(data)
   //   }
   //   })
    } catch (err) {
      console.error(err);
    }
  };

  module.exports  = mongoDB

  