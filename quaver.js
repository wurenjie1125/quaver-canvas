/**
 * Created by weijian on 2017/2/27.
 */
window.onload = function(){
    var quaver = {
        alive:true
    };
    var game = {
        isStart:false,
        isEnd:false,
        isPause:true
    };
    var scene = {

    };
    var ctx;
    var canvas = document.getElementById('quaver');
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        var cw = ctx.canvas.width = document.body.clientWidth;
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
            image.src = 'assets/qua1.png';
            image.onload = function(){
                ctx.drawImage(image,50,10);

            }
        };
        drawBackground();
        drawQua();
    }
    var initGame = function () {
        clearCanvas();
        ctx.font = 'bold 34px Arial'
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
        console.log(ctx.measureText(startButton.text))
        canvas.addEventListener('click',function(e) {
            console.log("x:"+e.pageX+"y:"+e.pageY)
            if(e.pageX > startButton.startpx - 10 && e.pageX < startButton.endpx+10){
                if(e.pageY > startButton.py - 10 && e.pageY < 234){
                    console.log("click is true")
                    render();
                }
            }
        })

    };
    initGame()


}