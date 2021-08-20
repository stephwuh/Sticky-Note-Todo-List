let toDoList = require('./db.json')
globalId = 4;

module.exports = {
    getList: (_req, res) => {
        res.send(toDoList)
    },
    createList: (req, res) => {
        const {title, body} = req.body;
        const newItem = {
            title,
            body,
            id: globalId
        }
        toDoList.push(newItem);
        globalId ++;
        res.send('Item saved successfully!')
    },
    deleteSaved: (_req, res) => {
        toDoList = []
        globalId = 1;
        res.send('Previously saved list completely deleted!')
    },
    saveAll: (req, res) => {
        const {title, body} = req.body;
        const newItem = {
            title,
            body,
            id: globalId
        }
        toDoList.push(newItem);
        globalId ++;
        res.send('Item saved successfully!');
        
    }
}