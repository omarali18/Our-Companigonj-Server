const express = require('express')
var cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.av6mz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
  try{
    await client.connect()
    console.log("Database connected");

    const database = client.db("Companigonj");
    const HospitalCollection = database.collection("Hospitals");
    const policeCollection = database.collection("Police");


    app.get("/hospitals", async (req,res)=>{
      const result = await HospitalCollection.find({}).toArray()
      res.send(result)
    })
    app.get("/polices", async (req,res)=>{
      const result = await policeCollection.find({}).toArray()
      res.send(result)
    })

  }
  finally{
    // await client.close()
  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening to ${port}`)
})