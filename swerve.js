window.onload = function() {


  let keysPressed = {};
  onkeydown = onkeyup = function(e) {
    keysPressed[e.keyCode] = e.type == 'keydown';
  }

  setInterval(driveRobot, 33);

  let TURN_SPEED = 5;
  let DRIVE_SPEED = 10;
  let DEGREES_TO_RADS = Math.PI / 180;
  let fieldCentricControls = false;
  let robot = document.getElementById('robot');
  robot.style.top = '100px';
  robot.style.left = '100px';
  robot.style.transform = 'rotate(0)';

  function driveRobot() {
    let degrees = parseFloat(robot.style.transform.substr(7));
    let top = parseFloat(robot.style.top);
    let left = parseFloat(robot.style.left);

    if (keysPressed[37]) {
      //rotate left
      degrees -= TURN_SPEED;
    }
    if (keysPressed[39]) {
      //rotate right
      degrees += TURN_SPEED;
    }

    if (keysPressed['W'.charCodeAt(0)]) {
      if (fieldCentricControls) {
        top -= DRIVE_SPEED;
      }
      else {
        top -= Math.cos(degrees * DEGREES_TO_RADS) * DRIVE_SPEED;
        left += Math.sin(degrees * DEGREES_TO_RADS) * DRIVE_SPEED;
      }
    }
    if (keysPressed['A'.charCodeAt(0)]) {
      if (fieldCentricControls) {
        left -= DRIVE_SPEED;
      }
      else {
        top -= Math.cos((degrees-90) * DEGREES_TO_RADS) * DRIVE_SPEED;
        left += Math.sin((degrees-90) * DEGREES_TO_RADS) * DRIVE_SPEED;
      }
    }
    if (keysPressed['S'.charCodeAt(0)]) {
      if (fieldCentricControls) {
        top += DRIVE_SPEED;
      }
      else {
        top -= Math.cos((degrees-180) * DEGREES_TO_RADS) * DRIVE_SPEED;
        left += Math.sin((degrees-180) * DEGREES_TO_RADS) * DRIVE_SPEED;
      }
    }    
    if (keysPressed['D'.charCodeAt(0)]) {
      if (fieldCentricControls) {
        left += DRIVE_SPEED;
      }
      else {
        top -= Math.cos((degrees+90) * DEGREES_TO_RADS) * DRIVE_SPEED;
        left += Math.sin((degrees+90) * DEGREES_TO_RADS) * DRIVE_SPEED;
      }
    }

    robot.style.transform = 'rotate('+degrees+'deg)';
    robot.style.left = left + 'px';
    robot.style.top = top + 'px';
  }

};