/**
 * Created by weijian on 2017/2/28.
 */
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

try{
    var audioContext = new AudioContext();
}catch(e){
    Console.log('!Your browser does not support AudioContext');
}

var gameStart = function(){
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(stream){

        var audioSource = audioContext.createMediaStreamSource(stream);
        var analyser = audioContext.createAnalyser()
        audioSource.connect(analyser);

        var timer = setInterval(function(){

            getVoiceSize(analyser)
        },10)

    }).catch(function(err){
        alert(err);
    })
    var getVoiceSize = function(analyser){

        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var data = array.slice(100,1000).reduce(function(a,b){
            return a + b;
        });
        console.log(data)
    }
}
