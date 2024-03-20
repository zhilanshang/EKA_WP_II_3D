const size = 100,
  xPosition = -100,
  yPosition = -100,
  zPosition = -500; // Center position of the cube

var map = [
    [0, 0, 1000, 0, 180, 0, 2000, 600, "url('textures/1.jpg')", "ff0000"],
    [0, 0, -1000, 0, 0, 0, 2000, 600, "url('textures/1.jpg')", "ff0000"],
    [1000, 0, 0, 0, -90, 0, 2000, 600, "url('textures/1.jpg')", "ff0000"],
    [-1000, 0, 0, 0, 90, 0, 2000, 600, "url('textures/1.jpg')", "ff0000"],
    [0, 100, 0, 90, 0, 0, 2000, 2000, "url('textures/2.jpg')", "00ff00"], //floor

    [830, 100, 350, 90, 0, 0, 264, 360, "url('textures/Teleport.gif')", "00ff00"], //hole
    //Patric's wall
    [500, 0, 580, 0, 0, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [500, 0, 600, 0, 0, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [0, 0, 590, 0, 90, 0, 20, 600, "url('textures/1.jpg')", "ff0000"],
    //Altyshka's wall
    [-500, 0, 500, 0, 90, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [-480, 0, 500, 0, 90, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [-490, 0, 0, 0, 0, 0, 20, 600, "url('textures/1.jpg')", "ff0000"],
    //Antelz's wall
    [680,0,-500, 0, 90, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [700, 0,-500, 0, 90, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [690, 0,0, 0, 0, 0, 20, 600, "url('textures/1.jpg')", "ff0000"],
    //Adheeksha's wall
    [-500, 0, -580, 0, 0, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [-500, 0, -600, 0, 0, 0, 1000, 600, "url('textures/1.jpg')", "ff0000"],
    [0, 0, -590, 0, 90, 0, 20, 600, "url('textures/1.jpg')", "ff0000"],
  
    // Top Face
    [xPosition, yPosition - 50, zPosition, 90, 0, 0, size, size, null, "#FF0000"],
    // Bottom Face
    [
      xPosition,
      yPosition + 50,
      zPosition,
      -90,
      0,
      0,
      size,
      size,
      null,
      "#00FF00",
    ],
    // Front Face
    [xPosition, yPosition, zPosition - 50, 0, 0, 0, size, size, null, "#4d0000"],
    // Back Face
    [
      xPosition,
      yPosition,
      zPosition + 50,
      0,
      180,
      0,
      size,
      size,
      null,
      "#FFFFFF",
    ],
    // Right Face
    [xPosition + 50, yPosition, zPosition, 0, 90, 0, size, size, null, "#00FFFF"],
    // Left Face
    [
      xPosition - 50,
      yPosition,
      zPosition,
      0,
      -90,
      0,
      size,
      size,
      null,
      "#0F7209",
    ],
  ];

function CreateNewWorld(myMap) {
  for (let i = 0; i < myMap.length; i++) {
    let newElement = document.createElement("div");
    newElement.className = "square";
    newElement.id = "square" + i;
    newElement.style.width = myMap[i][6] + "px";
    newElement.style.height = myMap[i][7] + "px";

    if (myMap[i][8] == null) {
      newElement.style.background = myMap[i][9];
    } else {
      newElement.style.backgroundImage = myMap[i][8];
    }

    newElement.style.transform =
      "translate3d(" +
      (600 - myMap[i][6] / 2 + myMap[i][0]) +
      "px," +
      (400 - myMap[i][7] / 2 + myMap[i][1]) +
      "px," +
      myMap[i][2] +
      "px)" +
      "rotateX(" +
      myMap[i][3] +
      "deg)" +
      "rotateY(" +
      myMap[i][4] +
      "deg)" +
      "rotateZ(" +
      myMap[i][5] +
      "deg)";

    world.append(newElement);
  }
}