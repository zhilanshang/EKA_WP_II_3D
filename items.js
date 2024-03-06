var items = [
    //[x, y, z, rx, ry, rz, radius, texture (null), coloor "#4d0000", form]
    [-800,0,-800,0,90,0, 25, null, "yellow", "square"],
    [800,0,-800,0,0,0, 25, null, "yellow", "circle"],
    [-800,-100,800,0,55,55, 25, null, "yellow", "star"],
    [800,0,800,0,90,0, 0, null, "yellow", "triangle"]
];

function createItems(){
    for(let i = 0; i < items.length; i++){
        let newElement = document.createElement("div");
        newElement.style.position = "absolute";
        if (items[i][9] == "circle") {
            newElement.className = "circle";
            newElement.style.width = items[i][6]*2 + "px";
            newElement.style.height = items[i][6]*2 + "px"; 
            if (items[i][7] == null) {
                newElement.style.background = items[i][8];
              } else {
                newElement.style.backgroundImage = items[i][7];
            } 
        } else if (items[i][9] == "square") {
            newElement.className = "square";
            newElement.style.width = items[i][6]*2 + "px";
            newElement.style.height = items[i][6]*2 + "px";
            if (items[i][7] == null) {
                newElement.style.background = items[i][8];
              } else {
                newElement.style.backgroundImage = items[i][7];
            }
        } else if (items[i][9] == "triangle") {
            newElement.className = "triangle";
            newElement.style.width = 0;
            newElement.style.height = 0;
            if (items[i][7] == null) {
                newElement.style.borderBottom = "50px solid " + items[i][8];
              } else {
                newElement.style.backgroundImage = items[i][7];
            }
            if(items[i][9] == null){
                newElement.style.background=items[i][8];
                } else {
                    newElement.style.backgroundImage = items[i][7];
                }
            } else if (items[i][9] == "star"){
                newElement.className = "star";
                newElement.style.width = 0;
                newElement.style.height = 0;
                if (items[i][7] == null){
                    newElement.style.borderBottom = "50px solid" + items[i][8];
                } else {
                    newElement.style.backgroundImage = items[i][7];
                }
        }
        newElement.id = "item" + i;
        

        

        
        
          newElement.style.transform =
          "translate3d(" +
          (600 - items[i][6] + items[i][0]) +
          "px," +
          (400 - items[i][7] + items[i][1]) +
          "px," +
          items[i][2] +
          "px)" +
          "rotateX(" +
          items[i][3] +
          "deg)" +
          "rotateY(" +
          items[i][4] +
          "deg)" +
          "rotateZ(" +
          items[i][5] +
          "deg)";

          world.append(newElement);
    }
}