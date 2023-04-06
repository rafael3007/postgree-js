import express from "express";

const PORT = 3000
const app = express()


app.get('/', (req,res)=>{
    res.send("Router GET / is running")
})





app.listen( process.env.PORT || PORT, ()=>{
    console.log(`Server is running`)
})