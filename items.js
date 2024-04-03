var items = [
  //[x, y, z, rx, ry, rz, radius, texture (null), coloor "#4d0000", form]
  [-800, 0, -800, 0, 90, 0, 25, null, "yellow", "square"],
  [800, 0, -800, 0, 0, 0, 25, null, "yellow", "circle"],
  [-800, -100, 800, 0, 55, 55, 25, null, "yellow", "star"],
  [800, 0, 800, 0, 0, 0, 25, null, "yellow", "triangle"],
];

var itemsZhilan = [
  [-500,0,-450,0,90,0,30, null, "#990066", "circle"],
  [500,-50,0,0,0,30,40, null, "#990066", "triangle"],
  [500,0,100,0,0,0,25, null, "#990066", "square"],
];

function createItems(myItems) {
  for (let i = 0; i < myItems.length; i++) {
    let newElement = document.createElement("div");
    newElement.style.position = "absolute";
    if (myItems[i][9] == "circle") {
      newElement.className = "circle";
      newElement.style.width = myItems[i][6] * 2 + "px";
      newElement.style.height = myItems[i][6] * 2 + "px";
      if (myItems[i][7] == null) {
        newElement.style.background = myItems[i][8];
      } else {
        newElement.style.backgroundImage = myItems[i][7];
      }
    } else if (myItems[i][9] == "square") {
      newElement.className = "square";
      newElement.style.width = myItems[i][6] * 2 + "px";
      newElement.style.height = myItems[i][6] * 2 + "px";
      if (myItems[i][7] == null) {
        newElement.style.background = myItems[i][8];
      } else {
        newElement.style.backgroundImage = myItems[i][7];
      }
    } else if (myItems[i][9] == "triangle") {
      newElement.className = "triangle";
      newElement.style.width = 0;
      newElement.style.height = 0;
      if (myItems[i][7] == null) {
        newElement.style.borderBottom = "50px solid " + myItems[i][8];
      } else {
        newElement.style.backgroundImage = myItems[i][7];
      }
      if (myItems[i][9] == null) {
        newElement.style.background = myItems[i][8];
      } else {
        newElement.style.backgroundImage = myItems[i][7];
      }
    } else if (myItems[i][9] == "star") {
      newElement.className = "star";
      newElement.style.width = 0;
      newElement.style.height = 0;
      if (myItems[i][7] == null) {
        newElement.style.borderBottom = "50px solid" + myItems[i][8];
      } else {
        newElement.style.backgroundImage = myItems[i][7];
      }
    }
    newElement.id = "item" + i;

    newElement.style.transform =
      "translate3d(" +
      (600 - myItems[i][6] + myItems[i][0]) +
      "px," +
      (400 - myItems[i][7] + myItems[i][1]) +
      "px," +
      myItems[i][2] +
      "px)" +
      "rotateX(" +
      myItems[i][3] +
      "deg)" +
      "rotateY(" +
      myItems[i][4] +
      "deg)" +
      "rotateZ(" +
      myItems[i][5] +
      "deg)";

    world.append(newElement);
  }
}
