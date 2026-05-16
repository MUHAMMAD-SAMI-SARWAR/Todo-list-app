let inputBox=document.querySelector(".input-box input");

let inputBoxBtn=document.querySelector(".input-box button");

let results=document.querySelector(".results");

let filterButtons=document.querySelectorAll(".btn-list button");

let themeBtn=document.querySelector(".icon");

let taskLeft=document.querySelector(".h4");

let clearCompleted=document.querySelector(".h4-2")

let userdata=JSON.parse(localStorage.getItem('Info')) ?? [];

let currentFilter="all";


inputBoxBtn.addEventListener("click",(e)=>{
    // let resultBoxes=document.createElement("div");
    // resultBoxes.className="result-boxes";
    // resultBoxes.innerText=inputBox.value;
    // console.log(inputBox.value);
    // results.appendChild(resultBoxes)

    if(!checkTask()){
        return;
    }

    // let newBox=document.createElement('div');

    // newBox.innerHTML=`
    // <div class="result-boxes">
    //         <p><i class="fa-solid fa-check"></i> ${inputBox.value}</p>
    //         <div class="del-edit-icon">
    //             <i class="fa-solid fa-trash" class="end"></i> <i class="fa-regular fa-pen-to-square" class="end"></i>
    //         </div>
    // </div>`;


    // AVOID DUPLICATE VALUES

    let value=inputBox.value.trim().toLowerCase();

    if(!userdata.some(item => item.text === value)){
        userdata.push({
            text:value,
            completed:false
        });
    }

    // userdata.push(inputBox.value);

    localStorage.setItem("Info",JSON.stringify(userdata));

    showData();

    e.preventDefault();

    inputBox.value='';


    checkTask();
})


function showData(){

    results.innerHTML='';

    let filteredData=userdata;

    if(currentFilter === "active"){
        filteredData = userdata.filter(item => !item.completed);
    }

    else if(currentFilter === "completed"){
        filteredData = userdata.filter(item => item.completed);
    }

    let activeTasks=userdata.filter(item => !item.completed).length;

    taskLeft.innerText=`${activeTasks} tasks left`;

    let completedTasks=userdata.filter(item => item.completed).length;

    clearCompleted.innerText=`Clear completed (${completedTasks})`;

        filteredData.forEach((item,index)=>{
            let newBox=document.createElement('div');

        newBox.innerHTML=`
            <div class="result-boxes">
                    <p class="parag ${item.completed ? 'active-mode':''}">
                    <span class="check-icon ${item.completed ? 'checked':''}" onclick="toggleBtn(${index})")>
                        <i class="fa-solid fa-check"></i>
                    </span> 
                    <span class="task-text ${item.completed ? 'active-mode' : ''}">${item.text}</span>
                    </p>
                    <div class="del-edit-icon">
                        <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i> <i class="fa-regular fa-pen-to-square" onclick="editTask(${index})"></i>
                    </div>
            </div>`;

        results.appendChild(newBox);
    })
}

function deleteTask(index){
    userdata.splice(index,1);

    localStorage.setItem("Info",JSON.stringify(userdata));

    showData();
}

function editTask(index){
    inputBox.value=userdata[index].text;
    userdata.splice(index,1);
    localStorage.setItem("Info",JSON.stringify(userdata));

    showData();
}


function checkTask(){
    let text=inputBox.value.trim();

    if(text === ''){
        return false;
    }
    return true;
}

function toggleBtn(index){
    userdata[index].completed=!userdata[index].completed;

    localStorage.setItem("Info",JSON.stringify(userdata));

    showData();
}

filterButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        currentFilter=button.innerText.toLowerCase();
        showData();
    })
})

// Click toggle

themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
})

// Load saved theme

if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark-mode")
};


inputBox.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        inputBoxBtn.click();
    }
})

showData();


// let a=[];
// let b="dog";
// for(let i=1;i<=b.length;i++){
//     a.push(b)
// }
// console.log(a);


// let arr = ["Ali","Ahmed","Hamza"];

// arr.forEach((item)=>{
//     console.log(item);
// });

// for(let i=0; i<arr.length; i++){

//     let item = arr[i];

//     console.log(item);
// }


let fruits=["mango","apple","Ops"];

console.log(fruits.includes("grapes"));



