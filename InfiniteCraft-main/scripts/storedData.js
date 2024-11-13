let stored_names = ["Water", "Fire", "Earth", "Air"];


if(localStorage.getItem("infiniteCraft.save")) {
    let stored = JSON.parse(localStorage.getItem("infiniteCraft.save"));
    for(let i = 0;i<stored.length;i++) {
        stored_names.push(stored[i]["item"]);
        const newElementDiv = document.createElement("div");
        newElementDiv.classList.add("element");
        if(stored[i]["new"]) {
          newElementDiv.classList.add("new");
        }
        newElementDiv.id = stored_names.length-1;
        newElementDiv.textContent = stored[i]["emoji"] + " " + stored[i]["item"];
        sidebar.appendChild(newElementDiv);
    
        newElementDiv.addEventListener("mousedown", function (event) {
          createDraggableClone(newElementDiv, event);
        });
    }
}
