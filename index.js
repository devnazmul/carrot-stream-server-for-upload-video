const express = require('express');


require('dotenv').config()

const app = express()

app.get('/',(req,res)=>{
    res.send(`running`)
});


app.listen(process.env.PORT,()=>{
    console.log(`app is listening on ${process.env.API_BEGINNING_POINT}:${process.env.PORT}`);
})