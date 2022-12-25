import './css/DecoPage.css';
import bgColor from './randomColor';

var num = 0;
document.onkeypress = function(e) {
    if(e.keyCode == 13){
        var text = document.getElementById('toolInput1').value;
        for (var ch=0; ch < text.length; ch++){
            text = text.replace("\\", "/")
        }
        
        createBall();
        document.getElementById('toolInput1').value = text;  
    } 
}

function tool() {
    var text = document.getElementById('toolInput1').value;
    for (var ch=0; ch < text.length; ch++){
        text = text.replace("\\", "/")
    }

    createBall();
    document.getElementById('toolInput1').value = text;    
}

function createBall() {
    document.getElementById('decoPage').style.backgroundColor = createColor();
    
    var ball = document.createElement("div");
    ball.id = "ball" + num++;
    ball.style.marginLeft = Math.round(Math.random() * 10000 % 50) + "px";
    ball.style.marginTop = Math.round(Math.random() * 10000 % 480) + "px";
    ball.style.width = "20px";
    ball.style.height = "20px";
    ball.style.rotate = Math.round(Math.random() * 10000 % 360) +"deg";
    ball.style.backgroundColor = createColor();
    document.getElementById('desk').append(ball);
}

function createColor() {
    var color = "#";
    for (var i=0; i<6; i++){
        var num = Math.round(Math.random() * 100 % 16);
        if (num < 10) {
            color += num.toString();
        }
        else {
            if (num == 10) {
                color += "A";
            }
            else if (num == 11) {
                color += "B";
            }
            else if (num == 12) {
                color += "C";
            }
            else if (num == 13) {
                color += "D";
            }
            else if (num == 14) {
                color += "E";
            }
            else if (num == 15) {
                color += "F";
            }
        }    
    }
    return color;
}

function DecoPage() {
    return (
        <div id="decoPage">
            <br/><br/>
            <div id="title">
                <b>꾸미기페이지</b>
                <p>슬러시 바꾸기</p>
            </div>
            <br/>
            <input id="toolInput1" type={Text} autoFocus />
            <button id="toolBtn1" onClick={tool}>
                <b>클릭</b>
            </button>
            <div id="desk">
            </div>
        </div>
    );
}

export default DecoPage;