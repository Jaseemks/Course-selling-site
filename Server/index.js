const express = require("express")
const app = express()
const port = process.env.PORT;
// console.log(process.env.PORT);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log('Helloo.........');
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 