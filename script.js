let textField = document.getElementById("textInput");
let confirmButton = document.getElementById("addTask");
let countCompleted = document.getElementById("completedTask")
let countUncompleted = document.getElementById('uncompletedTask')
let liss = document.getElementById("myList")
let comp;
let uncomp;

let tasks=[]
loadTask();
renderTasks()

confirmButton.addEventListener("click", addText);
textField.addEventListener('keydown', checkKey);

function checkKey(event){
    if(event.key === 'Enter'){
        addText(); 
        event.preventDefault(); 
    }
}

function renderTasks(){
    liss.innerHTML = ''
    comp=0;
    uncomp=0;
    for(let i=0;i<tasks.length;i++){
        const newLi = document.createElement('li');

        const newInput = document.createElement('input')
        newInput.type = 'checkbox'
        newInput.checked = tasks[i].completed
        newInput.addEventListener('click', () => toggleTaskComplete(i));

        if(tasks[i].completed){
            newLi.classList.add("completed")
            comp++;
        }else{uncomp++;}

        const newText = document.createElement('span')
        newText.textContent = tasks[i].text

        const newSpan = document.createElement('span')

        const newDelete = document.createElement('button')
        newDelete.classList.add("deleteTask")
        newDelete.textContent="Delete"
        newDelete.addEventListener('click', () => deleteTask(i));

        const newEdit = document.createElement('button')
        newEdit.classList.add("editTask")
        newEdit.textContent="Edit"
        newEdit.addEventListener('click', () => editTask(i));



        newLi.appendChild(newInput)
        newLi.appendChild(newText)
        newLi.appendChild(newSpan)
        newSpan.appendChild(newDelete)
        newSpan.appendChild(newEdit)

        liss.appendChild(newLi)
        
    }
    countCompleted.textContent=comp;
    countUncompleted.textContent=uncomp;
    saveTask();
}
function addText(){
    if(textField.value!=''){
        tasks.push( { text: textField.value, completed: false })
        textField.value = '';
        renderTasks();
    }
}
function toggleTaskComplete(index){
    if(tasks[index].completed){
        tasks[index].completed=false;
    }else{
        tasks[index].completed=true;
    }
    renderTasks();
}
function deleteTask(index){
    tasks.splice(index, 1);
    renderTasks();
}
function editTask(index){
    let infoEdit = prompt("New title: ")
    tasks[index].text = infoEdit;
    renderTasks();
}
function saveTask(){
    const JSONtask= JSON.stringify(tasks);
    localStorage.setItem("MyList", JSONtask);
}
function loadTask(){
    const newJSONtask = localStorage.getItem("MyList")
    if (newJSONtask) {
        tasks = JSON.parse(newJSONtask);
    } else {
        tasks = [];
    }
}