/**
 * Created by weijian on 2017/2/27.
 */
window.onload = function(){

    //音频部分
    var audio = {
        minVoice:20000,
        audioInit:function(){
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

            try{
                audio.audioContext = new AudioContext();
            }catch(e){
                Console.log('!Your browser does not support AudioContext');
            }
        },
        createAudioContext:function(){
            var t = this;
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(stream){

                var audioSource = audio.audioContext.createMediaStreamSource(stream);
                var analyser = audio.audioContext.createAnalyser();
                audioSource.connect(analyser);
                var timer = setInterval(function(){
                    t.getVoiceSize(analyser)
                },10)

            }).catch(function(err){
                alert(err);
            })
        },
        getVoiceSize:function(analyser){
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var voiceData = array.slice(100,1000).reduce(function(a,b){
                return a + b;
            });
            // console.log(voiceData)
            if(voiceData > this.minVoice){
                quaver.voiceData = voiceData;
                console.log(ground)
                ground = ground.splice(1);
                console.log(ground)
                quaver.status = quaver.status == 1?2:1;
                render();
            }
        }
    };
    audio.audioInit();




    var quaver = {
        alive:true,
        status:1,
        voiceData:0
    };
    var game = {
        isStart:false,
        isEnd:false,
        isPause:true
    };
    var ground = (function(){
        var arr = [];
        for(var i=0;i<50;i++){
            arr.push(1);
        }
        for(i=0;i<20;i++){
            arr.push(0);
        }
        for(i=0;i<80;i++){
            arr.push(1);
        }
        return arr;
    })();
    console.log("gorund:"+ground);
    var ctx;
    var canvas = document.getElementById('quaver');
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        // var cw = ctx.canvas.width = document.body.clientWidth;
        var cw = ctx.canvas.width;

        var ch = ctx.canvas.height
    }
    var clearCanvas = function(){
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    };
    var render =  function(){
        clearCanvas();

        var drawBackground = function(){
            ctx.fillStyle = "#fff";
            ctx.fillRect(0,0,cw,ch);
        };
        var drawQua = function(){
            var image = new Image();
            if(quaver.status == 1){
                image.src = 'assets/qua1.png';
            }else{
                image.src = 'assets/qua2.png';
            }
            image.onload = function(){
                ctx.drawImage(image,50,115);
            }
        };
        var drawGround = function(){

            var drawunit = function (x) {
                ctx.fillRect(px,py,10,100);
                px += 10;
            }
            ctx.fillStyle = 'black';
            var px = 0;
            var py = 200;
            var unit = 10;
            for(var i=0;i<ground.length;i++){
                if(!ground[i]){
                    px += 10;
                }else if(ground[i] == 1){
                    drawunit()
                }
                // if(ground[i] == 1){
                //
                // }
            }
        };
        drawBackground();
        drawQua();

        drawGround();
    }
    var initGame = function () {
        clearCanvas();
        ctx.font = 'bold 34px Arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        var title = {
            text: '休むな、8分音符ちゃん',
            px: cw/2,
            py: 100
        };
        // title.px = cw/2 - ctx.measureText(title.text).width/2;

        var startButton = {
            text: 'start',
            px: cw/2,
            py: 200
        };
        startButton.startpx = cw/2 - ctx.measureText(startButton.text).width/2;
        startButton.endpx = cw/2 + ctx.measureText(startButton.text).width/2;

        ctx.fillText(title.text, title.px, title.py);
        ctx.font = '24px Arial';
        console.log(title)
        console.log(startButton)
        ctx.fillText(startButton.text, startButton.px, startButton.py);
        canvas.addEventListener('click',function(e) {
            console.log("x:"+e.layerX+"y:"+e.layerY)
            console.log(e)

            if(e.layerX > startButton.startpx - 10 && e.layerX < startButton.endpx+10){
                if(e.layerY > startButton.py - 10 && e.layerY < 234){
                    render();
                    audio.createAudioContext();
                }
            }
        })

    };
    initGame()


}