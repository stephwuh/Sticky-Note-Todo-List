
const toDoButton = document.querySelector('#button');
const inputFieldItem = document.querySelector('#item')
const toDoList = document.querySelector('#list')
const placeHolder = document.querySelector('input').getAttribute('placeHolder')
const section = document.querySelector('section');
const getButton = document.querySelector('#get')
const deleteAllButton = document.querySelector('#delete-All')
const saveAllButton = document.querySelector('#save-All')
const body = document.querySelector('body');


// Button color change

const btnColorChange = (e) => {
    toDoButton.style.backgroundColor= '#ffffff'
}
toDoButton.addEventListener('mouseover', btnColorChange)

const btnColorReturn = (e) => {
    toDoButton.style.backgroundColor= '#808080'
}
toDoButton.addEventListener('mouseout', btnColorReturn)

// Get Button function

function getData(e){
    e.preventDefault();
    axios.get('http://localhost:5050/api/list')
    .then(function(res){
      
        for (let i=0; i < res.data.length; i++) {
            const data = document.createElement('h2');
            const data1 = document.createElement('div')
            data.innerText = res.data[i].title;
            data1.innerText = res.data[i].body;
            const createLiTag = document.createElement('li');
            const createATag = document.createElement('a');
            createATag.setAttribute('href','#');
            createATag.setAttribute('contenteditable','');
            const createDivTag = document.createElement('div');
            createDivTag.setAttribute('class','button-container')
            const addDeleteButton = document.createElement('button');
            addDeleteButton.textContent = 'x'
            addDeleteButton.setAttribute('class','button')
            addDeleteButton.addEventListener('click', deleteList);
            const addCheckOffButton = document.createElement('button');
            addCheckOffButton.textContent = '✓'
            addCheckOffButton.setAttribute('class', 'button')
            addCheckOffButton.addEventListener('click',crossOffItem);
            const addSaveButton = document.createElement('button');
            addSaveButton.textContent = 's';
            addSaveButton.setAttribute('class','button')
            addSaveButton.addEventListener('click',postData)
            toDoList.appendChild(createLiTag).appendChild(createATag).appendChild(data);
            createATag.appendChild(data1)
            createLiTag.appendChild(createDivTag);
            createDivTag.appendChild(addDeleteButton);
            createDivTag.appendChild(addCheckOffButton);
            createDivTag.appendChild(addSaveButton);
        }
    })
}

getButton.addEventListener('click',getData);

// Button to do add function
const addToDo = (e) => {
    e.preventDefault();
    const createLiTag = document.createElement('li');
    const createATag = document.createElement('a');
    createATag.setAttribute('href','#');
    createATag.setAttribute('contenteditable','');
    const toDoItem = document.createElement('h2');
    toDoItem.textContent = inputFieldItem.value;
    const createDivTag = document.createElement('div');
    createDivTag.setAttribute('class','button-container')
    const addDeleteButton = document.createElement('button');
    addDeleteButton.textContent = 'x'
    addDeleteButton.setAttribute('class','button')
    addDeleteButton.addEventListener('click', deleteList);
    const addCheckOffButton = document.createElement('button');
    addCheckOffButton.textContent = '✓'
    addCheckOffButton.setAttribute('class', 'button')
    addCheckOffButton.addEventListener('click',crossOffItem);
    const addSaveButton = document.createElement('button');
    addSaveButton.textContent = 's';
    addSaveButton.setAttribute('class','button')
    addSaveButton.addEventListener('click',postData)
    toDoList.appendChild(createLiTag).appendChild(createATag).appendChild(toDoItem);
    createLiTag.appendChild(createDivTag);
    createDivTag.appendChild(addDeleteButton);
    createDivTag.appendChild(addCheckOffButton);
    createDivTag.appendChild(addSaveButton);
    inputFieldItem.value='';
    inputFieldItem.setAttribute("placeholder","Input Item");
}

toDoButton.addEventListener('click', addToDo);


// delete button

const deleteList = (evnt) => {
    evnt.target.parentNode.parentNode.remove();
}

// Cross-Off Button

const crossOffItem = (evnt) => {
    evnt.target.parentNode.parentNode.firstChild.classList.toggle('checked');
}

// save button

function postData(evnt){
    let body = "";
    for (let i=1; i< evnt.target.parentNode.previousSibling.childNodes.length; i++){
        body += ` ${evnt.target.parentNode.previousSibling.childNodes[i].textContent}`;
    }
    axios.post('http://localhost:5050/api/list/create', {
      'title': `${evnt.target.parentNode.previousSibling.childNodes[0].textContent}`,
      'body': body
    })
    .then(function(res){
        alert(res.data)
    })
    .catch(function(err){
        console.log('error')
    })
}

// Delete All Button
function deleteSaved(){
    // evnt.preventDefault();
    axios.delete('http://localhost:5050/api/list/deleteSaved')
    .then(function(res){
        alert(res.data)
    })
    .catch(function(err){
        console.log('error')
    })
}

deleteAllButton.addEventListener('click', deleteSaved)

// Save All Button

function saveAll(evnt){
    const liList = document.querySelectorAll('li')
    for (let i=0; i< liList.length; i++){
        let body = '';
        for(let j=1; j < liList[i].childNodes[0].childNodes.length; j++){
            body += ` ${liList[i].childNodes[0].childNodes[j].textContent}`
        }
        axios.post('http://localhost:5050/api/list/saveAll', {
        'title': `${liList[i].childNodes[0].childNodes[0].textContent}`,
        'body' : body
        })
        .then(function(res){
            alert(res.data)
        })
        .catch(function(err){
            console.log('error')
        })
    }

}

saveAllButton.addEventListener('click', saveAll)

// input field placeholder 
const clearPlace = (evnt) =>{
    evnt.stopPropagation();
    inputFieldItem.setAttribute("placeholder","");
}

inputFieldItem.addEventListener('click', clearPlace)

const placeholderReturn = (evnt) => {    
        inputFieldItem.setAttribute("placeholder","Input Item");
}

body.addEventListener('click',placeholderReturn);


