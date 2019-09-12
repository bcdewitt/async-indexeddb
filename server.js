const path = require('path')
const express = require('express')

const indexFilePath = path.join(__dirname, 'public', 'index.html')
const port = 3000

const app = express()

app.get('/', (req, res) => res.sendFile(indexFilePath))
app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
