
const model = './model/';
let pitch;
let mic;
let freq = 0;

function setup(){
    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);
}

function listening(){
    console.log("Listening");
    pitch = ml5.pitchDetection(model, audioContext, mic.stream, modelLoaded);
}

function modelLoaded(){
    console.log('Model Loaded');
    pitch.getPitch(gotPitch);
}

function gotPitch(err, frequency){
    if(err){
        console.error(err);
    }else{
        console.log(frequency);
        if(frequency){
            freq = frequency;
        }
        pitch.getPitch(gotPitch);
    }
}