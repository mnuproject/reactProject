import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

import chatBot from './img/imgChatbot.png';
import './css/Home.css'

// ----------------------------------------------------------------------------------- firebase
const firebaseConfig = {
    apiKey: "AIzaSyBcjPgVzgFheSOuEz5xe-Aq1sPL2y2zwIc",
    authDomain: "test-js-eb389.firebaseapp.com",
    databaseURL: "https://test-js-eb389-default-rtdb.firebaseio.com",
    projectId: "test-js-eb389",
    storageBucket: "test-js-eb389.appspot.com",
    messagingSenderId: "720289458573",
    appId: "1:720289458573:web:85506a1639044ebb4af5c4",
    measurementId: "G-B09P0RM178"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

var ip = "";
function userIP() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET","https://api.ipify.org/?format=jsonp&callback=?");
  xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          ip = "Ip " + xhttp['response'].split("\"")[3].replace(".", "-").replace(".", "-").replace(".", "-");
      }
  };
  xhttp.send();

  return ip;
}

// ----------------------------------------------------------------------------------- write
userIP();
function writeUserData() {
  userIP();
  var text = document.getElementById('searchText').value;
  document.getElementById('searchText').value = "";
  botReply(text);
  
  set(ref(database, ip + '/TEXT/' + new Date(Date.now())), {
      text    
  });
}

function writeUserData_Key() {
    if (window.event.keyCode == 13) {
        writeUserData();
    }
}

function writeUserDataSpeech(text) {
    userIP();
    document.getElementById('searchText').value = "";
    set(ref(database, ip + '/SPEECH/' + new Date(Date.now())), {
        text    
    });
  }


// ----------------------------------------------------------------------------------- speak
function speak(text) {
    if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
        return
    }
    
    window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = 1.3    
    speechMsg.pitch = 1.2
    speechMsg.lang = "ko-KR"
    speechMsg.text = text
    
    window.speechSynthesis.speak(speechMsg);
}

// ----------------------------------------------------------------------------------- listener
function speechRecognize() {
    var isReady = true;
  
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!("webkitSpeechRecognition" in window)){
        alert("이 브라우저는 음성 인식을 지원하지 않습니다.")
        return
    }
          
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.maxAlternatives = 1000;
  
    recognition.onspeechend = function() {
        speak("결과 값 처리 중입니다");
        recognition.stop();
        isReady = true;
    };
  
    recognition.onresult = function(e) {
        var texts = Array.from(e.results).map(results => results[0].transcript).join("");
        writeUserDataSpeech(texts);
        botReply(texts);
    };
  
    if(isReady){
        document.getElementById("chatMsg").innerText = "음성인식 중입니다";
        localStorage.removeItem('web');
        speak("음성인식 중입니다");
        recognition.start();
        isReady = false;
    } else {
        recognition.stop();
        isReady = true;
    }
}

// ----------------------------------------------------------------------------------- Reply
function botReply(text) {
    if (text.includes("안녕")){
        try {
            document.getElementById("chatMsg").innerText = "안녕하세요\n" + new Date(Date.now());
          } catch (e) {}
        speak("안녕하세요\n" + new Date(Date.now()));
    }
    else if (text.includes("홈") || text.includes("메인")) {
        window.location.replace("/");
        speak("메인 페이지로 이동합니다");
    }
    else if (text.includes("학교")) {
        window.location.replace("/page1");
        speak("학교 페이지로 이동합니다");
    }
    else if (text.includes("도구")){
        window.location.replace("/page2");
        speak("도구 페이지로 이동합니다");
    }
    else if (text.includes("프로필")){
        window.location.replace("/profile");
        speak("프로필 페이지로 이동합니다");
    }
    else if (text.includes("참고자료")){
        window.location.replace("/ref");
        speak("참고자료 페이지로 이동합니다");
    }
    else if (text.includes("소개")){
        document.getElementById("chatMsg").innerText = "음성인식이나 입력을 통해\n홈, 학교, 도구, 프로필, 참고자료 페이지로\n이동하실 수 있습니다";
        speak("음성인식이나 입력을 통해\n홈, 학교, 도구, 프로필, 참고자료 페이지로\n이동하실 수 있습니다");
    } 
    else {
        document.getElementById("chatMsg").innerText = "음성인식이나 입력을 통해\n홈, 학교, 도구, 프로필, 참고자료 페이지로\n이동하실 수 있습니다";
        speak("모르겠어요\n음성인식이나 입력을 통해\n홈, 학교, 도구, 프로필, 참고자료 페이지로\n이동하실 수 있습니다");
    }
  }

function bot() {
    if (localStorage.getItem('web') == "opened"){
        var msg3 = "음성인식을 사용하시려면,\nctrl과 스페이스바를 동시에 눌러주세요";
        setTimeout(function() {
            document.getElementById("chatMsg").innerText = msg3;
            speak(msg3);
        }, 10);
    }
    else {
        var msg1 = "안녕하세요\n입력한 개인정보(IP주소, 음성인식, 텍스트입력)를\n데이터베이스에 저장하여\n더 나은 서비스를 위해 사용됩니다";
        setTimeout(function() {
            document.getElementById("chatMsg").innerText = msg1;
            speak(msg1);
        }, 10);

        var msg2 = "음성인식이나 입력을 통해\n홈, 학교, 도구, 프로필, 참고자료 페이지로\n이동하실 수 있습니다";
        setTimeout(function() {
            document.getElementById("chatMsg").innerText = msg2;
            speak(msg2);
            localStorage.setItem('web', "opened");
        }, 14200);

        var msg3 = "음성인식을 사용하시려면,\nctrl과 스페이스바를 동시에 눌러주세요";
        setTimeout(function() {
            document.getElementById("chatMsg").innerText = msg3;
            speak(msg3);
        }, 24950);
    }
}

// ----------------------------------------------------------------------------------- main
function Home() {
    bot();

    return (
        <section className='home'>
            <div>
                <div id="chat">
                    <div id="chatMsg"><b>챗 봇</b></div>
                </div>
                <input id="searchText" type={'text'} onKeyUp={ writeUserData_Key } autoFocus />
                <button id="searchBtn" onClick={ writeUserData }><b>검색</b></button>
            </div>
            <img id="chatBot" onClick={ speechRecognize } src={chatBot}/>            
        </section>
    );
}

export default Home;