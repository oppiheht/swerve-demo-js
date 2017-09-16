window.onload = function() {

  let keysPressed = {};
  onkeydown = onkeyup = function(e) {
    keysPressed[e.keyCode] = e.type == 'keydown';
  }

  setInterval(driveRobot, 33);
  let gamepadCheckInterval = setInterval(detectGamepad, 100);

  let gamepadIndex = null;
  let TURN_SPEED = 10;
  let DRIVE_SPEED = 10;
  let DEGREES_TO_RADS = Math.PI / 180;
  let fieldCentricControls = true;
  let robot = document.getElementById('robot');
  robot.style.top = '100px';
  robot.style.left = '100px';
  robot.style.transform = 'rotate(0)';

  function driveWithGamepad() {
    let gamepad = navigator.getGamepads()[gamepadIndex]
    console.log(gamepad.buttons[0].value);
    let degrees = parseFloat(robot.style.transform.substr(7));
    let top = parseFloat(robot.style.top);
    let left = parseFloat(robot.style.left);

    degrees += gamepad.axes[2].toFixed(1) * TURN_SPEED;
    top += gamepad.axes[1].toFixed(1) * DRIVE_SPEED;
    left += gamepad.axes[0].toFixed(1)* DRIVE_SPEED;

    robot.style.transform = 'rotate('+degrees+'deg)';
    robot.style.left = left + 'px';
    robot.style.top = top + 'px';
  }

  function driveRobot() {
    if (gamepadIndex != null) {
      driveWithGamepad();
    }
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

  function detectGamepad() {
    let g = navigator.getGamepads();
    for (let i = 0; i < g.length; i++) {
      if (g[i] && g[i].buttons[0].value == 1) {
        gamepadIndex = i;
        clearInterval(gamepadCheckInterval);
      }
    }
  }

};