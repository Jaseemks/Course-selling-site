const express = require("express");
const { apiRouter } = require("./routes");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const {handleError} = require("./utils/error");
const app = express()
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT;
// console.log(process.env.PORT);
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log('Helloo.........');

app.use("/api",apiRouter)

app.use(handleError)

app.all("*",(req,res)=>{

  res.status(404).json({message: "end point doesnt exist"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 