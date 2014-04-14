    var kick, snare, hh;
    var tone, feedbackDelay;
    var aStep;
    var steps = [];
    var stepCounter = 0;
    var bpm = 100;
    var numSteps = 16;
    Tone.Transport.loop = true;
    Tone.Transport.setLoopStart("0:0");
    Tone.Transport.setLoopEnd("1:0");
    Tone.Transport.setBpm(bpm);

//document ready function
    $( document ).ready(function() {
      loadFiles(initTransport);
      createSteps();
      assignTempo();
      createCheckBoxes();
      assignCheckBoxes();
    });

function setBPM(e) {
  console.log(e);
  bpm = e;
  Tone.Transport.setBpm(bpm);
  $("#tempotxt").html("BPM: " + bpm);
}

function loadFiles(callback) {


  //create Delay node
  feedbackDelay = new Tone.FeedbackDelay(.25);
  feedbackDelay.setDelayTime("0:0:1");
  feedbackDelay.setFeedback(.6);
  feedbackDelay.toMaster();

  //load files
      kick = new Tone.Player("../audio/505/kick.mp3");
      kick.load(console.log('loaded kick!'));
      kick.connect(feedbackDelay);

      snare = new Tone.Player("../audio/505/snare.mp3");
      snare.load(console.log('loaded snare!'));
      snare.connect(feedbackDelay);

      hh = new Tone.Player("../audio/505/hh.mp3");
      hh.load(console.log('loaded hh!'));
      hh.connect(feedbackDelay);

      initTransport();
}

function createSteps() {
    aStep = function() {
      this.kick = 0;
      this.snare = 0;
      this.hh = 0;
    }

    for (i = 1; i<=numSteps; i++) {
      steps.push(new aStep());
      console.log("step " + i)
    };
  }
//
function createCheckBoxes() {
  for (i = 1; i<=numSteps; i++) {
      $("#kickTog").append('<input type="checkbox" name="kick" value="'+i+'" >');
      $("#snareTog").append('<input type="checkbox" name="snare" value="'+i+'" >');
      $("#hhTog").append('<input type="checkbox" name="hh" value="'+i+'" >');
      $("#clicker").append('<input type="radio" name="keepTime" id="c'+i+'" value="'+i+'" >');

  }
}

function assignTempo() {
    $("#tempo").val(bpm);
    $("#tempotxt").html("BPM: " + bpm);
    console.log()
}

function assignCheckBoxes() {
    $('[type="checkbox"]').change(function() {
      console.log(this.name + " " + this.value + " " + Number(this.checked));
      var tStep = steps[this.value-1];
      var tInstr = this.name;
      tStep[tInstr] = Number(this.checked);
   });
}



function keepTime(whichBeat) {
  var radButtons = $('#c'+(whichBeat+1))
  $(radButtons).prop("checked", true)
}

function initTransport() {
    Tone.Transport.setInterval(function(startTime){
      stepCounter++;
      stepCounter = stepCounter % steps.length;
      var step = steps[stepCounter];
      if (step.kick == 1) {
        kick.start();
      }
      if (step.snare == 1) {
        snare.start();
      }
      if (step.hh == 1) {
        hh.start();
      }
      keepTime(stepCounter);
      // console.log(stepCounter);
    }, "0:0:1");

    Tone.Transport.start(0);
}


//change delay parameters
function delTime(val) {
  var whole = Tone.prototype.transportTimeToSeconds("0:1:0");
  var newVal = val*whole;
  feedbackDelay.setDelayTime(newVal);
  console.log("del time: " + newVal);
}

function delFeedback(val) {
  console.log("del feedback: " +val);
  // feedbackDelay.setDelayTime("0:0:1");
  feedbackDelay.setFeedback(val);
}

function delWet(val) {
  console.log("del wet" +val);
  // feedbackDelay.setDelayTime("0:0:1");
  feedbackDelay.setWet(val, .2);
}
