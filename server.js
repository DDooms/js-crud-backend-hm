const express = require("express")
const userRoutes = require("./src/users/routes")

const app = express()
const port = 3000

app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/users', userRoutes)

app.listen(port, () => console.log(`app listening at port ${port}`))
