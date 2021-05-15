/*Press the play button in the top-left to start,
then follow the instructions on the screen*/
let hueArray = [0, 60, 120, 180, 240, 300];
let satSlider;
let valSlider;
let scene = 0;
let rectSat;
let rectVal;
let hueCount = 0;
let writer;


var dateTimeLog = new Date();

function setup() {
  writer = createWriter('data.txt');
  createCanvas(600, 400);
  //set color mode to Hue, Saturation and Brightness, as the default is RGB
  colorMode(HSB);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  //slider parameters
  satSlider = createSlider(0, 100, 50, 1);
  valSlider = createSlider(0, 100, 50, 1);
  //placing the sliders
  satSlider.position(20, 310);
  satSlider.style('width', '550px');
  valSlider.position(20, 340);
  valSlider.style('width', '550px');
}

//randomize colors
function keyPressed() {
  //log the time
  writer.write(dateTimeLog);

  //progress past the instruction screen
  if (scene == 0) {
    scene++;
  } else if (scene == 1) {
    writer.write(rectHue + ', ' + satSlider.value() + ', ' + valSlider.value() + ' spaced\n');

    hueCount++;
  } 
  
  if (scene == 1 && hueCount >= 6) {
    scene++;
  }

  rectHue = hueArray[hueCount];
}

function draw() {

  rectSat = satSlider.value();
  rectVal = valSlider.value();

  //cases
  switch (scene) {
    case 0:
      scene0();
      break;
    case 1:
      scene1();
      break;
    case 2:
      scene2();
      break;
    default:
  }

  function scene0() {
    //instructions screen
    background(0);
    fill(255);
    textFont('helvetica', 18);
    text('Press the spacebar to begin!', 300, 200);
    fill(0);
    satSlider.hide();
    valSlider.hide();
  }


  function scene1() {
    background(0);

        satSlider.show();
    valSlider.show();
    //reports the H,S of the left side and the H,S,V of the right side
    if (keyIsPressed) {
      colorReport();
    }
    let visibleCount = hueCount+1;

    noStroke();
    fill(255);
    textFont('helvetica', 12);
    text('Press the spacebar to submit your response.', 450, 380);
text('Trial: ' + visibleCount + '/6', 50, 380);
    //left side rectangle
    fill(rectHue, satSlider.value(), valSlider.value());
    rect(300, 150, 570, 275);

  }

  function scene2() {
    //instructions screen
    background(0);
        satSlider.hide();
    valSlider.hide();
    fill(255);
    textFont('helvetica', 18);
    text('Thank you for participating!\n\nIn the box below, please upload the data.txt file \n that should have downloaded.', 300, 200);
    
    writer.close();
    noLoop();
  }

    //reports the H,S, V
  function colorReport() {
    writer.write(rectHue + ', ' + satSlider.value() + ', ' + valSlider.value()+ ' to\n');
  }

}