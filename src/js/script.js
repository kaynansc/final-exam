/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let askUserButton = document.getElementById("askUser");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

function createListElement() {
    if (taskExists(input.value)) {
        alert("This task already exists!");
        return;
    }

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";

    //START STRIKETHROUGH
    // because it's in the function, it only adds it for new items
    function crossOut() {
        li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);
    //END STRIKETHROUGH


    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    dBtn.addEventListener("click", deleteListItem);
    li.appendChild(dBtn);

}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        createListElement();
    }
}

function taskExists(task) {
    for (let i = 0; i < item.length; i++) {
        if (item[i].textContent.slice(0, -1).toLowerCase() === task.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function deleteListItem(e) {
    e.target.parentElement.remove();
}

function askUser() {
    let task;
    do {
        task = prompt("Enter a new task (or click Cancel to stop):");
        if (task === null) break;
        if (task.trim() === "") {
            alert("Task cannot be empty!");
        } else if (taskExists(task)) {
            alert("This task already exists!");
        } else {
            input.value = task;
            createListElement();
        }
    } while (true);
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
askUserButton.addEventListener("click", askUser);

