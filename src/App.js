import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

import React from 'react';
import { Route, Routes, Link } from "react-router-dom";

import Home from './page/Home';
import Page1 from './page/Page1';
import Page2 from './page/Page2';
import Page3 from './page/Page3';
import Ref from './page/Ref';
import './page/css/App.css';

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
function writeUserDataSpeech(text) {
    userIP();
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
      try {
        document.getElementById("chatMsg").innerText = "결과 값 처리 중입니다";
      } catch (e) {}
        speak("결과 값 처리 중입니다");
        recognition.stop();
        isReady = true;
    };
  
    recognition.onresult = function(e) {
        var text = Array.from(e.results).map(results => results[0].transcript).join("");
        writeUserDataSpeech(text);
        botReply(text);
    };
  
    if(isReady){
        speak("음성인식 중입니다");
        recognition.start();
        isReady = false;
    } else {
        recognition.stop();
        isReady = true;
    }
}   

// ----------------------------------------------------------------------------------- Call
var isCtrl = false;  
document.onkeyup=function(e){  
  if(e.which == 17){
      isCtrl = false;
  }   
}  
document.onkeydown=function(e){ 
  if(e.which == 17) {
    isCtrl=true;  
  }
  if(e.which == 32 && isCtrl == true) {
    try {
      document.getElementById("chatMsg").innerText = "음성인식 중입니다";
    } catch (e) {}  
      speechRecognize();
      return false;  
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

// ----------------------------------------------------------------------------------- main
function App() {
  return (
    <div className="App">
      <nav>
        <ul id="menuCss">
          <li><Link id="menuLi" to="/">홈</Link></li>
          <li><Link id="menuLi" to="/page1">ToDoLIST</Link></li>
          <li><Link id="menuLi" to="/page2">도구 페이지</Link></li>
          <li><Link id="menuLi" to="/profile">프로필</Link></li>
          <li><Link id="menuLi" to="/ref">참고자료</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/profile" element={<Page3 />} />
        <Route path="/ref" element={<Ref />} />
      </Routes>
    </div>
  );
}

export default App;
