const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors= require("cors");
const app =express();
app.use(express.json());

var database

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use(cors());

app.get("/api/books",(req,res)=>{
    database.collection("books").find({}).toArray((err,result) =>{
        if(err)
        throw err
        res.send(result);
    })
})

app.get("/api/books/:id",(req,res)=>{
    database.collection("books").find({id:parseInt(req.params.id)}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

app.post("/api/books/addbook",(req,res)=>{
    let rs = database.collection("books").find({}).sort({id:-1}).limit(1)
    rs.forEach(obj=>{
        if(obj){
            let book={
                id:obj.id+1,
                name:req.body.name
            }
            database.collection("books").insertOne(book,(err,result)=>{
                if(err) res.send(500).send(err)
                res.send("Added Succesfully");
            })
        }
    })
})

app.put("/api/books/:id",(req,res)=>{
    let query={id:parseInt(req.params.id)}
    let book = {
        id:parseInt(req.params.id),
        name:req.body.name
    }
    let dataSet={
        $set:book 
    }
    database.collection("books").updateOne(query,dataSet,(err,result)=>{
        if(err) throw err
        res.send(book)
    })
})

app.delete("/api/books/:id",(req,res)=>{
    database.collection("books").deleteOne({id:parseInt(req.params.id)},(err,result)=>{
        if(err) throw err
        res.send("Book is deleted");
    })
})

app.listen(5000,()=>{
    MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,result)=>{
        if(err){
            throw err
        }
      database = result.db("mydatabase")
      console.log("Connection Successful");
    })
})