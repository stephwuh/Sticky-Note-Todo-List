const express = require('express');
const cors = require('cors');
const ctrl = require('./controller.js')
const app = express();

//middleware
app.use(cors())
app.use(express.json())

//endpoints
app.get('/api/list', ctrl.getList)
app.post('/api/list/create', ctrl.createList)
app.delete('/api/list/deleteSaved', ctrl.deleteSaved)
app.post('/api/list/saveAll', ctrl.saveAll)


//port info
const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})