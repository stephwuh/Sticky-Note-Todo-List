const express = require('express');
const cors = require('cors');
const ctrl = require('./server/controller.js')
const app = express();
const path = require('path');

//middleware
app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client')));

//endpoints
app.get('/api/list', ctrl.getList)
app.post('/api/list/create', ctrl.createList)
app.delete('/api/list/deleteSaved', ctrl.deleteSaved)
app.post('/api/list/saveAll', ctrl.saveAll)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+ '/client/build/index.html'));
//   });


//port info
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})