var button;
var amp;
var mic;

var volhistory = [];

  function setup() {
    createCanvas(1200, 200);
    button = createButton('toggle');
    mic = new p5.AudioIn();
    mic_start = mic.start();
    amp = new p5.Amplitude();
    getAudioContext().resume();
    // button.mousePressed(mic_start);
  }
  
  function draw() {
    background(0);
    var vol = mic.getLevel();
    volhistory.push(vol);
    noFill();
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
      stroke(255)
      var y = map(volhistory[i], 0, 1, height/2, 0);
      vertex(i,y);
    }
    endShape();

    if(volhistory.length > width) {
      volhistory.splice(0,1);
    }

    stroke('yellow');
    line(volhistory.length, height/2, volhistory.length, 0);
    // ellipse(100, 100, 200, vol * 200);
  }

