// const {MongoClient} = require('mongodb')
// const url = 'mongodb://localhost:27017'
// const dbName = 'Form'
// const collectionName = 'information'

// let dbCollection;
// let client;

// async function connectToDatabase (){
//     try{
//         client = new MongoClient(url)
//         await client.connect()
//        dbCollection = client.db(dbName).collection(collectionName);
//     }catch(err){
//         throw err;
//     }
// }

// async function closeMongoDBConnection (){
//     if(client){
//         await client.close()
//         .then (()=>{
//             console.log('Disconnected from MongoDB')
//             process.exit(0)
//         })
//         .catch(error =>{
//             console.error('Failed to disconnect from MongoDB',error)
//             process.exit(1)
//         })
//     }else{
//         process.exit(0);
//     }
// }
// //Create
// async function create(documents){
//    try{
//     const result = await dbCollection.insertMany(documents)
//     console.log(`${result.insertedCount} documents inserted successfully.`)
//    }catch (error) {
//     console.error('Failed to insert documents:', error);
// }
// }

// //Update
// async function update(searchValue, updateData) {
//     try {
//         console.log("Updating documents...");
//         const result = await dbCollection.updateMany(
//             { $or: [ { name: searchValue }, { email: searchValue } ] }, 
//             { $set: updateData } 
//         );

//         console.log(`${result.modifiedCount} documents updated successfully.`);
//         return result;
//     } catch (error) {
//         console.error('Failed to update documents:', error);
//         throw error;
//     }
// }

// //Read
// async function readDocument(){
//     try{
//         const documents = await dbCollection.find({}).toArray()
//         return documents
//     }catch(err){
//         console.error('Failed to read documents',err)
//         throw err
//     }
// }
// module.exports = {connectToDatabase,closeMongoDBConnection,dbCollection,create,update,readDocument}

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const dbName = 'MotorBikes';
// const collectionName = 'motor';

// let dbCollection;
// let client;

// // Hàm kết nối đến cơ sở dữ liệu
// async function connectToDatabase() {
//     try {
//         client = new MongoClient(url);
//         await client.connect();
//         dbCollection = client.db(dbName).collection(collectionName);
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB:', err);
//         throw err;
//     }
// }

// // Hàm đóng kết nối đến cơ sở dữ liệu
// async function closeMongoDBConnection() {
//     if (client) {
//         await client.close()
//             .then(() => {
//                 console.log('Disconnected from MongoDB');
//                 process.exit(0);
//             })
//             .catch(error => {
//                 console.error('Failed to disconnect from MongoDB', error);
//                 process.exit(1);
//             });
//     } else {
//         process.exit(0);
//     }
// }

const { MongoClient } = require('mongodb');
const url ='mongodb://localhost:27017';
const dbName = 'MotorBikes';
const collectionName = 'motor';

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(url);
    return client.db(dbName).collection(collectionName);
  } catch (err) {
    console.error('Lỗi kết nối', err);
    throw err;
  }
}

async function closeMongoDBConnect(client) {
  try {
    if (client && typeof client.close === 'function') {
      await client.close();
      console.log('MongoDB connection closed.');
    } else {
      console.log('MongoDB connection is not valid or already closed.');
    }
  } catch (err) {
    console.error('Failed to close MongoDB connection:', err);
    throw err;
  }
}

// Hàm tạo một bản ghi
async function createOne(data) {
    try {
        const dbCollection = await connectToMongoDB()
        const result = await dbCollection.insertOne(data);
        return result;
    } catch (error) {
        throw error;
    }
}

// Hàm tạo nhiều bản ghi
async function createMany(data) {
    try {
      const dbCollection = await connectToMongoDB()
      const result = await dbCollection.insertMany(data);
      return result;
    } catch (error) {
        throw error;
    }
}
async function findMotorToUpdate(query){
  const dbCollection = await connectToMongoDB()
  try{
    const findQuery = await dbCollection.find(query).toArray()
    return findQuery
  }catch(e){
   console.error('Error tto find',e)
   throw e;
  }
}

// Hàm tìm kiếm theo truy vấn
async function findByQuery(query) {
  const dbCollection = await connectToMongoDB()
    try {
        const findQuery = await dbCollection.find(query).toArray()
        return findQuery;
    } catch (error) {
        console.error('Error finding motor:', error);
        throw error;
    }
}
async function findAll(){
    try{
      const dbCollection = await connectToMongoDB()
      const findAllMotors = dbCollection.find({}).toArray()
      return findAllMotors
    }catch(error){
        console.error('Error to find',error)
        throw error;
    }
}

module.exports = {
   connectToMongoDB,
    closeMongoDBConnect,
    createOne,
    createMany,
    findByQuery,
    findAll,
    findMotorToUpdate
};
