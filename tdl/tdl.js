document.addEventListener('DOMContentLoaded',()=>{
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasklist=document.getElementById('tasklist');
    const addtask=document.getElementById('addtask');
    const searchInput=document.getElementById('search')
    const okbutton=document.getElementById('ok');
    const toaddtask =()=>{
        const task=addtask.value.trim();
        if(task){
            tasks.push(task);
            localStorage.setItem('tasks',JSON.stringify(tasks));
            addtask.value='';
            rendertask();
        }
    };
    const rendertask =()=>{
        tasklist.innerHTML='';
        tasks.forEach((task,index)=>{
            const li=document.createElement('li');
            li.innerHTML = `
                <input type="text" value="${task}" readonly />
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
               
            `;
            tasklist.appendChild(li);
        });
    };
    window.editTask = (index) => {
        const taskItems = tasklist.getElementsByTagName('li');
        const taskItem = taskItems[index];
        const inputField = taskItem.querySelector('input[type="text"]');
        inputField.removeAttribute('readonly');
        inputField.focus();
        inputField.addEventListener('blur', () => {
            inputField.setAttribute('readonly', true);
            tasks[index] = inputField.value.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            rendertask();
        });
    };
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.toLowerCase().includes(filter));
        tasklist.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="text" value="${task}" readonly />
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            tasklist.appendChild(li);
        });
    });
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        rendertask();
    };
    rendertask();
    okbutton.addEventListener('click',toaddtask);

});