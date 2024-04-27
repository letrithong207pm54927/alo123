// const express = require('express')
// const app = express()
// const port = 3000
// const path = require('path')

// const {MongoClient} = require('mongodb')
// const url = 'mongodb://localhost:27017'
// const client = new MongoClient(url)
// const dbName = 'Form'
// const collectionName = 'information'





// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'pages/home.html'));
// })
// app.get('/create1',(req,res)=>{
//     res.sendFile(path.join(__dirname,'pages/create.html'))
// })
// app.post('/create',async(req,res)=>{
//   try{
//     await client.connect()
//     console.log('Connet to MongoDB successfully')

//     const users = req.body
//     console.log(users)

//     console.log('start inserting to db')
//     usersCollection = await client.db(dbName).collection(collectionName)
//     await usersCollection.insertMany(users)
//     const content = `${users.length} users created successfully`
//     res.json({message:content}) //reponse to fetch
//   }catch(err){
//      console('Error',err)
//   }finally{
//      if(client){
//         await client.close();
//         console.log('MongoDB connection closed')
//      }
     
//   }
// })
// //Update
// app.post('/update', async (req, res) => {
//   try {
//     await client.connect()
//     console.log('Connected to MongoDB successfully')

//     const updatedCar = req.body;
//     const id = updatedCar.id;

//     console.log('Updating car with ID:', id);

//     const carsCollection = client.db(dbName).collection(collectionName);
//     const result = await carsCollection.updateOne(
//       { id: id }, // Query to find the document with the specified ID
//       { $set: updatedCar } // Update the found document with the new data
//     );

//     if (result.matchedCount > 0) {
//       res.json({ message: `Car with ID ${id} updated successfully` });
//     } else {
//       res.json({ message: `Car with ID ${id} not found` });
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     if (client) {
//       await client.close();
//       console.log('MongoDB connection closed');
//     }
//   }
// });
// app.get('/find',async(req,res)=>{
//   try{
//     const id = req.query.id

//     await client.connect();
//     console.log('Connected to MongoDB successfully');

//     const carsCollection = client.db(dbName).collection(collectionName);
//     const car = await carsCollection.findOne({ id: id });

//     if(car){
//       res.json({car:car})
//     }else{
//       res.json({car:null})
//     }
//   }catch(err){
//     console.error('Erorr',err)
//     res.status(500).json({ message: 'Internal server error' });
//   }finally{
//     if(client) {
//       await client.close()
//       console.log('MongoDB connection closed')
//     }
//   }
// })

// app.get('/read1',(req,res)=>{
//     res.sendFile(path.join(__dirname,'pages/read.html'))
// })
// app.get('/update',(req,res)=>{
//   res.sendFile(path.join(__dirname,'pages/update.html'))
// })
  
// const sever = app.listen(port, () => console.log(`Example app listening on port ${port}!`))




  // app.post('/addUser', express.json(), async (req, res) => {
//     try {
//       const { name, email } = req.body;
//       await create([{ name: name, email: email }]);
//       res.sendStatus(200); 
//     } catch (error) {
//       console.error('Error adding user:', error);
//       res.sendStatus(500); 
//     }
//   });
//   app.put('/updateUser', express.json(), async (req, res) => {
//     try {
//         const { name, email, updateQuery } = req.body;
//         const result = await update(name, email, updateQuery);
//         if (result && result.modifiedCount > 0) {
//             res.sendStatus(200); 
//         } else {
//             res.sendStatus(500); 
//         }
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.sendStatus(500); 
//     }
// });
  
  
  // connectToDatabase()
// .then(()=>{
//     console.log('Connect to mongoDB successfully')
// })
// .catch((err)=>{
//     console.error('Failed to connect to MongoDb',err)
//     sever.close()
// })
//Read and show users to display
// app.get('/users',async(req,res)=>{
//    try{
//     const users = await readDocument()
//     res.json(users)
//    }catch(err){
//     console.error('Error reading users',err)
//     res.sendStatus(500)
//    }
// })// connectToDatabase()
// .then(()=>{
//     console.log('Connect to mongoDB successfully')
// })
// .catch((err)=>{
//     console.error('Failed to connect to MongoDb',err)
//     sever.close()
// })
//Read and show users to display
// app.get('/users',async(req,res)=>{
//    try{
//     const users = await readDocument()
//     res.json(users)
//    }catch(err){
//     console.error('Error reading users',err)
//     res.sendStatus(500)
//    }
// })


const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const motorikes = require('./publics/javascrips/motorbike')
const mongodb = require('./publics/javascrips/mongodb')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongodb.connectToMongoDB()
  .then(()=>{
    console.log('kết nối mongo thành công');
  })
  .catch((err)=>{
    console.error('Lỗi kết nối',err);
    Server.close();
  });

process.on('SIGNIT',()=>{
  mongodb.closeMongoDBConnect();
});


app.post('/createOne',async(req,res)=>{
  try{
    const data = req.body
    const result = await mongodb.createOne(data)
    res.json({message:'Data successfully saved to MongoDB',result})
  }catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ message: 'Error saving data to MongoDB' });
  }
})
// app.post('/search', async (req, res) => {
//   const { id, brand, model, year, engineDisplacement, color } = req.body;

//   let query = {};

//   if (id) query.id = id;
//   if (brand) query.brand = { $regex: brand, $options: 'i' };
//   if (model) query.model = { $regex: model, $options: 'i' };
//   if (year) query.year = year;
//   if (engineDisplacement) query.engineDisplacement = { $regex: engineDisplacement, $options: 'i' };
//   if (color) query.color = { $regex: color, $options: 'i' };

//   try {
//       const result = await Car.find(query);
//       res.json(result);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });app.post('/search', async (req, res) => {
//   const { id, brand, model, year, engineDisplacement, color } = req.body;

//   let query = {};

//   if (id) query.id = id;
//   if (brand) query.brand = { $regex: brand, $options: 'i' };
//   if (model) query.model = { $regex: model, $options: 'i' };
//   if (year) query.year = year;
//   if (engineDisplacement) query.engineDisplacement = { $regex: engineDisplacement, $options: 'i' };
//   if (color) query.color = { $regex: color, $options: 'i' };

//   try {
//       const result = await search(query)
//       res.json(result);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });
app.post('/createMany',async(req,res)=>{
  try{
    const data = req.body
    const result = await mongodb.createMany(data)
    res.json({message:'Data successfully saved to MongoDB',result})
    
  }catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ message: 'Error saving data to MongoDB' });
  }
})

app.get('/', (req, res) =>  res.sendFile(path.join(__dirname,'./publics/pages/home.html')))
app.get('/api/update',async(req,res)=>{
  const{id,brand} = req.query
  const query = {}
  try{
    if (id) {
      query.$or = [
          { "id": { $regex: /mtsb/ } },
          { "id": id }
      ];
  }
  if(brand){
    query.brand = {$regex:brand}
  }
  const result = await mongodb.findMotorToUpdate(query)
  res.json(result)
  }catch(e){
     console.error('Eror',e)
  }
})
app.get('/api/search',async(req,res)=>{
  const{minCost,maxCost,brand,model,engineDisplacement,year} = req.query
  const query = {}
  // Thêm điều kiện tìm kiếm từ giá thấp nhất tới giá cao nhất
  try{
    if (minCost && maxCost) {
    query.cost = { $gte: parseInt(minCost), $lte: parseInt(maxCost) };
  } else if (minCost) {
    query.cost = { $gte: parseInt(minCost) };
  } else if (maxCost) {
    query.cost = { $lte: parseInt(maxCost) };
  }
  if (brand) {
    query.brand = { $regex: brand, $options: "i" };
  }
  if (model) {
    query.model = { $regex: model, $options: "i" };
  }
  if (engineDisplacement) {
    query.engineDisplacement = { $regex: engineDisplacement, $options: "i" };
  }
  if (year) {
    query.year = { $regex: year.toString() };
  }
  

     const motorikes = await mongodb.findByQuery(query)
     res.json(motorikes)
  }catch (error) {
    console.error('Error searching motorbikes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
   
})
app.get('/api/allData',async(req,res)=>{
  try{
    const findAllMoto = await mongodb.findAll()
    res.json(findAllMoto)
  }catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching all data' });
  }
})

// app.get('/seach',async (req,res)=>{
//   const id = req.query.id
//   const brand = req.query.brand
//   const model = req.query.model
//   const year = req.query.year
//   const engineDisplacement = req.query.engineDisplacement
//   const color = req.query.color
  
//   const query = {}
//   if (id) {
//       query.id = {$regex:id,$options:'i'}    
//   }
//   if(brand){
//     query.brand = {$regex: brand,$options:'i'}
//   }
//   if(model){
//     query.model = {$regex:model,$options:'i'}
//   }
//    // Tìm kiếm trong khoảng theo year và engineDisplacement
//    if (year) {
//     query.year = parseInt(year); // Chuyển year sang kiểu number
// }
// if (engineDisplacement) {
//     query.engineDisplacement = {$regex:engineDisplacement,$options:'i'} // Chuyển engineDisplacement sang kiểu number
// }

// // Tìm kiếm theo color
// if (color) {
//     query.color = color;
// }

// try {
//     const results = await search(query);
//     res.json(results);
// } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
// }
// })
app.get('/create1',(req,res)=>{
  res.sendFile(path.join(__dirname,'./publics/pages/create.html'))
})
app.get('/update1',(req,res)=>{
  res.sendFile(path.join(__dirname,'./publics/pages/update.html'))
})
app.get('/read',(req,res)=>{
  res.sendFile(path.join(__dirname,'./publics/pages/read.html'))
})

app.listen(port,'127.0.0.1', () => console.log(`Example app listening on port 127.0.0.1:${port}!`))
