// Import Dependencies
const url = require('url')
var express =require('express');
var app=express();
const uri = "mongodb+srv://untanglegeek:Geeks%2320Ism%2ANerds@makaero.qc4nx.mongodb.net/makearo?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient

var port =process.env.PORT 
var router=express.Router();

//Routes will all be prefixed with /api
app.use('/test',router);

// Create cached connection variable
let cachedDb = null

// A function for connecting to MongoDB,taking a single parameter of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  // Select the database through the connection,using the database path of the connection string
  //const db = await client.db(url.parse(uri).pathname.substr(1))
  const db = await client.db("sample_analytics")
  // Cache the database connection and return the connection
  cachedDb = db
  return db
}

// The main, exported, function of the endpoint, dealing with the request and subsequent response
module.exports = async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(uri)

  // Select the "users" collection from the database
  //const collection = await db.collection('accounts')
  //var dbo = db.db("sample_analytics");
  const collection=await db.collection('customers')
  // Select the users collection from the database
  const users = await collection.find({}).toArray()

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ users })
  //res.status(200).send("Working")
}
router.get('/',function(req,res){
  res.json({message:'Welcome to our API'});
})
app.listen(port);

async function listDatabases(client){
 // databasesList = await client.db().admin().listDatabases();

  module.exports = async (req, res) => {
  //res.status(200).send("Databases:");	
  //databasesList.databases.forEach(db => res.status(200).json(` - ${db.name}`));
  }
};