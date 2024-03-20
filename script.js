var pi = 3.141592;
var deg = pi / 180;
var collectedItemCount = 0;
var collectionSound = new Audio("collect.mp3");

function player(x, y, z, rx, ry) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.rx = rx;
  this.ry = ry;
}

var PressBack = 0;
var PressForward = 0;
var PressLeft = 0;
var PressRight = 0;
var PressUp = 0;
var MouseX = 0;
var MouseY = 0;

var lock = false;

var onGround = true;

var container = document.getElementById("container");

document.addEventListener("pointerlockchange", (event) => {
  lock = !lock;
});

container.onclick = function () {
  if (!lock) container.requestPointerLock();
};

document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    PressLeft = 7;
  }
  if (event.key == "w") {
    PressForward = 7;
  }
  if (event.key == "d") {
    PressRight = 7;
  }
  if (event.key == "s") {
    PressBack = 7;
  }
  if (event.keyCode == 32 && onGround) {
    PressUp = 5;
    onGround = false;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "a") {
    PressLeft = 0;
  }
  if (event.key == "w") {
    PressForward = 0;
  }
  if (event.key == "d") {
    PressRight = 0;
  }
  if (event.key == "s") {
    PressBack = 0;
  }
  if (event.keyCode == 32) {
    PressUp = 0;
    onGround = true;
  }
});

document.addEventListener("mousemove", (event) => {
  MouseX = event.movementX;
  MouseY = event.movementY;
});

var pawn = new player(0, 0, 0, 0, 0);

var world = document.getElementById("world");

function update() {
   dx =
    (PressRight - PressLeft) * Math.cos(pawn.ry * deg) -
    (PressForward - PressBack) * Math.sin(pawn.ry * deg);
   dz =
    -(PressForward - PressBack) * Math.cos(pawn.ry * deg) -
    (PressRight - PressLeft) * Math.sin(pawn.ry * deg);
   dy = -PressUp;
   drx = MouseY;
   dry = -MouseX;

  MouseX = MouseY = 0;

  collision();

  pawn.x = pawn.x + dx;
  if (pawn.y >= -100) {
    pawn.y = pawn.y + dy;
  }

  pawn.z = pawn.z + dz;

  if (onGround) {
    if (pawn.y !== 0) {
      pawn.y = pawn.y + 1;
    }
  }

  if (lock) {
    pawn.rx = pawn.rx + drx;
    pawn.ry = pawn.ry + dry;
  }

  items.forEach((item, index) => {
    let dx = pawn.x - item[0];
    let dy = pawn.y - item[1];
    let dz = pawn.z - item[2];

    let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    document.getElementById("scoreBoard").innerText =
      "Collected Items: " + collectedItemCount + "/" + items.length;
    if (distance <= 8 * item[6]) {
      collectItem(index);
    }
  });

  world.style.transform =
    "translateZ(" +
    (600 - 0) +
    "px)" +
    "rotateX(" +
    -pawn.rx +
    "deg)" +
    "rotateY(" +
    -pawn.ry +
    "deg)" +
    "translate3d(" +
    -pawn.x +
    "px," +
    -pawn.y +
    "px," +
    -pawn.z +
    "px)";
}

function collectItem(index) {
  let itemElement = document.getElementById("item" + index);
  if (itemElement) {
    itemElement.parentNode.removeChild(itemElement);
    collectionSound
      .play()
      .catch((error) => console.error("Sound playback failed", error));

    collectedItemCount++;
  }
}

function collision() {

 onGround = false;

  for(let i=0; i<map.length; i++){
    //let's get the coordinates of the player in the system of coordinates of each rectangle
    let x0 = (pawn.x - map[i][0]);
    let y0 = (pawn.y - map[i][1]);
    let z0 = (pawn.z - map[i][2]);

    if((x0**2 + y0**2 + z0**2 + dx**2 + dy**2 + dz**2) < (map[i][6]**2 + map[i][7]**2)){
      //adding displacement
      let x1 = x0 + dx;
      let y1 = y0 + dy;
      let z1 = z0 + dz;

      //making new coordinates of the point
      let point0 = coorTransform(x0,y0,z0,map[i][3],map[i][4],map[i][5]);
      let point1 = coorTransform(x1,y1,z1,map[i][3],map[i][4],map[i][5]);
      let normal = coorReTransform(0,0,1,map[i][3],map[i][4],map[i][5]);
      // let point2 = new Array();

      if(Math.abs(point1[0])<(map[i][6]+70)/2 && Math.abs(point1[1])<(map[i][7]+70)/2 && Math.abs(point1[2])<50){
        point1[2] = Math.sign(point0[2])*50;
        let point2 = coorReTransform(point1[0],point1[1],point1[2],map[i][3],map[i][4],map[i][5]);
        let point3 = coorReTransform(point1[0],point1[1],0,map[i][3],map[i][4],map[i][5]);
        dx = point2[0] - x0;
        dy = point2[1] - y0;
        dz = point2[2] - z0;

        if(Math.abs(normal[1]) > 0.8){
          if(point3[1] > point2[1]){
            onGround = true;
          }
        } else {
          dy = y1 - y0;
        }
      }
    }
  };
}

function coorTransform(x0, y0, z0, rxc, ryc, rzc){
  let x1 = x0;
  let y1 = y0 * Math.cos(rxc*deg) + z0 * Math.sin(rxc*deg);
  let z1 = -y0 * Math.sin(rxc*deg) + z0 * Math.cos(rxc*deg);

  let x2 = x1 * Math.cos(ryc*deg) - z1 * Math.sin(ryc*deg);
  let y2 = y1;
  let z2 = x1 * Math.sin(ryc*deg) + z1 * Math.cos(ryc*deg);

  let x3 = x2 * Math.cos(rzc*deg) + y2 * Math.sin(rzc*deg);
  let y3 = -x2 * Math.sin(rzc*deg) + y2 * Math.cos(rzc*deg);
  let z3 = z2;
  return [x3, y3, z3];
}

function coorReTransform(x3, y3, z3, rxc, ryc, rzc){
  let x2 = x3 * Math.cos(rzc*deg) - y3 * Math.sin(rzc*deg);
  let y2 = x3 * Math.sin(rzc*deg) + y3 * Math.cos(rzc*deg);
  let z2 = z3;

  let x1 = x2 * Math.cos(ryc*deg) + z2 * Math.sin(ryc*deg);
  let y1 = y2;
  let z1 = -x2 * Math.sin(ryc*deg) + z2 * Math.cos(ryc*deg);

  let x0 = x1;
  let y0 = y1 * Math.cos(rxc*deg) - z1 * Math.sin(rxc*deg);
  let z0 = y1 * Math.sin(rxc*deg) + z1 * Math.cos(rxc*deg);

  return [x0, y0, z0];
}

CreateNewWorld(map);
createItems();
TimerGame = setInterval(update, 10);
