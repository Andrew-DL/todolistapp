let input = document.querySelector('input')

let taskList = []
//let taskListItem = {task: undefined, 'urgent': undefined, 'important': undefined}
//defined taskListItem in the addToTaskList function instead to prevent the data from previous task entries from overwriting each other. refer to: pass by refe value

let taskInput = document.getElementById("ToDoInput")
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
	console.log('enter key is pressed!!!')
	addToTaskList()
	storeTaskList()
	resetFields()
    }
})

taskInput.addEventListener("click", function(e){
    if (e.target.id === 'submit') {
	console.log('submit button is pressed!!!')
	addToTaskList()
	storeTaskList()
	resetFields()
    }
})

document.querySelector("#list").addEventListener('click', function(e){
    //console.log(e)
    if (e.target.className === 'deleteTask') {
	let data = JSON.parse(localStorage.taskList)
	let index = e.target.dataset.index
	//console.log(index)
	data.splice(index, 1)
	localStorage.setItem('taskList', JSON.stringify(data))
	e.target.parentElement.remove()
	clearQuadrants()
	let taskList = JSON.parse(localStorage.getItem('taskList'))
	let ul = document.getElementById('list')
	loadMatrix(taskList)
    }
})

window.addEventListener("load", (event) => {
    console.log('load event happens')
    if (localStorage.getItem('taskList') === null) {
	localStorage.setItem('taskList', '[]')
	console.log(localStorage.getItem('taskList'), 'please work')
    } else {
	taskListString = localStorage.getItem("taskList")
	taskList = JSON.parse(taskListString)
    }
    let ul = document.getElementById("list")
    //console.log(taskList)
    if (taskList === null) {
	//test deleting this if block later
	taskList = []
	storeTaskList()
    }
    loadVisuals(taskList, ul)
})

function addToTaskList(input) {
    let taskListItem = {}

    taskListItem['task'] = document.querySelector('#task').value
    if (document.querySelector("#urgent").checked) {
	taskListItem['urgent'] = true
    } else {
	taskListItem['urgent'] = false
    }
    if (document.querySelector("#important").checked) {
	taskListItem['important'] = true
    } else {
	taskListItem['important'] = false
    }
    taskList.push(taskListItem)

    let ul = document.getElementById("list")
    let li = document.createElement("li")
    li.setAttribute('class', 'li')
    //Double check whether or not I'm using setAttribute correctly here in conjun above two lines

    li.textContent = taskListItem.task
    let linebreak = document.createElement("br")
    li.appendChild(linebreak)
    createCheckBoxes(li, taskListItem)
    addDeleteTaskButton(li)

    ul.appendChild(li)
    //console.log(taskList)

    addTaskToMatrix(taskListItem)
}

function addDeleteTaskButton(element) {
    let button = document.createElement("button")
    button.setAttribute('class', 'deleteTask')
    button.textContent = 'Delete'
    button.dataset.index = document.getElementsByClassName('deleteTask').length
    clog(button.dataset.index)
    element.appendChild(button)
}

function addTaskToMatrix(taskListItem) {
        let value = getItemValue(taskListItem)
        if (value === 3) {
	    let q1List = document.getElementById('q1list')
	    let q1li = document.createElement('li')
	    q1li.textContent = taskListItem['task']
	    q1List.appendChild(q1li)
	}
	if (value === 2) {
	    let q2List = document.getElementById('q2list')
	    let q2li = document.createElement('li')
	    q2li.textContent = taskListItem['task']
	    q2List.appendChild(q2li)
	}
	if (value === 1) {
	    let q3List = document.getElementById('q3list')
	    let q3li = document.createElement('li')
	    q3li.textContent = taskListItem['task']
	    q3List.appendChild(q3li)
	}
	if (value === 0) {
	    let q4List = document.getElementById('q4list')
	    let q4li = document.createElement('li')
	    q4li.textContent = taskListItem['task']
	    q4List.appendChild(q4li)
	}
}

//make a function that replicates the above but for deleting all LIs from the matrix
function clearQuadrants() {
    let q1list = document.getElementById("q1list")
    let q2list = document.getElementById("q2list")
    let q3list = document.getElementById("q3list")
    let q4list = document.getElementById("q4list")
    
    q1list.replaceChildren()
    q2list.replaceChildren()
    q3list.replaceChildren()
    q4list.replaceChildren()
}


function clog(text) {
    console.log(text)
}

function createCheckBoxes(element, taskListItem) {
    let uLabel = document.createElement("label")
    uLabel.className = "uLabel"
    uLabel.textContent = "Urgent?"

    let checkBoxU = document.createElement("input")
    checkBoxU.type = "checkbox"
    checkBoxU.disabled = true

    let iLabel = document.createElement("label")
    iLabel.className = "iLabel"
    iLabel.textContent = "  " + "Important?"

    let checkBoxI = document.createElement("input")
    checkBoxI.type = "checkbox"
    checkBoxI.disabled = true
    
    checkBoxU.checked = taskListItem['urgent']
    checkBoxI.checked = taskListItem['important']

    let div = document.createElement("div")
    div.className = "checkboxes"
    element.appendChild(div)
    
    div.appendChild(uLabel)
    div.appendChild(checkBoxU)
    div.appendChild(iLabel)
    div.appendChild(checkBoxI)
    
    let linebreak = document.createElement("br")
    div.appendChild(linebreak)
}

function getItemValue(taskListItem, value = 0) {
    if (taskListItem['urgent'] === true) {
	value = value + 2
    }
    if (taskListItem['important'] === true) {
	value = value + 1
    }
    console.log(value)
    return value
}

function loadMatrix(taskList) {
    taskList.forEach(function(task) {
	addTaskToMatrix(task)
    })
}

function loadVisuals(taskList, ul) {
    taskList.forEach(function (task) {	
	let li = document.createElement("li")
	li.textContent = task.task
	let linebreak = document.createElement("br")
	li.appendChild(linebreak)
	createCheckBoxes(li, task)
	/*li.appendChild(linebreak)*/
	addDeleteTaskButton(li)
	ul.appendChild(li)
	addTaskToMatrix(task)
    })
}
    
function storeTaskList() {
    let taskListString = JSON.stringify(taskList)
    console.log(taskListString)
    localStorage.setItem("taskList", taskListString)
}

function resetFields() {
    document.getElementById('task').value = ""
    document.getElementById('urgent').checked = false
    document.getElementById('important').checked = false
}

function updateMatrix() {
    taskList.forEach(function (task) {	
	let li = document.createElement("li")
	li.textContent = task.task
	getItemValue(task, value)
	ul.removeChild(li)
    })
}
