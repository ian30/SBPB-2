let tools = document.getElementById('tools');
let workZone = document.getElementById("workZone");
let isDraggingNewElement = false; // Flag to determine if we are dragging a new element
let draggableIdCounter = 0;
function generateRandomID() {
    return ('10000' + Math.floor(Math.random() * 10000)).slice(1);
}
function makeDraggable(element) {
    if (element !== workZone) {
        element.draggable = true;
        element.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData("text", e.target.tagName.toLowerCase()); // Use tag name as data
            isDraggingNewElement = false; // Existing element is being dragged
        });
    }
    element.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    element.addEventListener('dragleave', function (e) {
        this.classList.remove('dragover');
    });
    element.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('dragover');
        // adding new element to workArea:
        if (isDraggingNewElement) {
            let selectedTool = e.dataTransfer.getData("text");
            switch (selectedTool) {
                case 'img':
                    let newImg = document.createElement('img');
                    newImg.src = 'https://picsum.photos/200/200';
                    newImg.alt = 'image alt';
                    newImg.id = 'el-' + generateRandomID();
                    makeDraggable(newImg);
                    e.target.appendChild(newImg);
                    break;
                case 'li':
                    let newLi = document.createElement('li');
                    newLi.style.padding = "0 0 0 10px";
                    newLi.textContent = "new LI element";
                    newLi.id = 'el-' + generateRandomID();
                    makeDraggable(newLi);
                    e.target.appendChild(newLi);
                    break;
                case 'hr':
                    let newHr = document.createElement('hr');
                    newHr.style.margin = "10px auto";
                    newHr.id = 'el-' + generateRandomID();
                    makeDraggable(newHr);
                    e.target.appendChild(newHr);
                    break;
                case 'p':
                    let newP = document.createElement('p');
                    newP.textContent = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend tellus mauris, vel scelerisque arcu finibus sed. Pellentesque nec semper elit, eu tincidunt orci. In eget ultrices nibh. Integer vel diam blandit eros lobortis fringilla viverra id tellus. Suspendisse nec hendrerit nunc, eget ornare augue. Aenean vitae nisl malesuada lacus laoreet venenatis. Sed tempor lacinia iaculis. Ut id finibus enim. Fusce et urna eros. Praesent at tristique quam. `;
                    newP.id = 'el-' + generateRandomID();
                    makeDraggable(newP);
                    e.target.appendChild(newP);
                    break;
                case 'div':
                    let newDiv = document.createElement('div');
                    newDiv.textContent = `new DIV element`;
                    newDiv.id = 'el-' + generateRandomID();
                    makeDraggable(newDiv);
                    e.target.appendChild(newDiv);
                    break;
                case 'ul':
                    let newEl = document.createElement(selectedTool);
                    //newEl.textContent = `new ${newEl.tagName} element`;
                    newEl.id = 'el-' + generateRandomID();
                    makeDraggable(newEl);
                    e.target.appendChild(newEl);
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    let newH = document.createElement(selectedTool);
                    newH.id = 'el-' + generateRandomID();
                    newH.textContent = `new ${newH.tagName} element`;
                    makeDraggable(newH);
                    e.target.appendChild(newH);
                    break;
                case 'small':
                case 'strong':
                case 'em':
                    let newSpan = document.createElement(selectedTool);
                    newSpan.textContent = `new ${newSpan.tagName} element`;
                    makeDraggable(newSpan);
                    e.target.appendChild(newSpan);
                    break;
                default:
                    console.log('please select a tool');
                    break;
            }
        }
        isDraggingNewElement = false; // Reset after drop
    });
}

// Add dragstart event listener to each tool
for (const tool of tools.children) {
    tool.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData("text", tool.textContent.trim().slice(1, -1)); // Get the tag name from textContent
        isDraggingNewElement = true; // A new element from toolbox is being dragged
    });
}
// Initialize workZone
makeDraggable(workZone);
//clearing the workZone
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
    document.getElementById("workZone").innerHTML = "";
});
//"Preview" removing the dashed border so we can actually see what's going on.
let isBorderVisible = true;
let previewBtn = document.getElementById("previewBtn");
previewBtn.addEventListener("click", function () {
    let workZoneElements = document.querySelectorAll("#workZone *");
    if (isBorderVisible) {
        for (const el of workZoneElements) {
            el.style.border = "none";
        }
    } else {
        for (const el of workZoneElements) {
            el.style.border = "2px dashed var(--cool-gray)"; // Adjust the border style as needed
        }
    }
    isBorderVisible = !isBorderVisible; // Toggle the flag
});
// listen to esc key to close .float-control if it's open:
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        let existingFloatControl = workArea.querySelector(".float-control");
        if (existingFloatControl) {
            existingFloatControl.remove();
        }
    }
});
