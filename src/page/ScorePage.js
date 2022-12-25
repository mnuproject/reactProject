import "./css/ScorePage.css";
import React, { useState } from "react";

const getAverage = (numbers) => {
  console.log("calculate average...");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const convt = (number) => {
  if(number == "A+"){
    return 4.5;
  }else if(number == "A"){
    return 4.0;
  }else if(number == "B+"){
    return 3.5;
  }else if(number == "B"){
    return 3.0;
  }else if(number == "C+"){
    return 2.5;
  }else if(number == "C"){
    return 2.0;
  }else if(number == "D+"){
    return 1.5;
  }else if(number == "D"){
    return 1.0;
  }else if(number == "F"){
    return 0;
  }else{
      alert('"A+","A","B+"의 형식으로 입력하세요');
      return -1;
  }
}

const ScorePage = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = () => {
    const score = convt(number.toUpperCase());
    if (score > -1) {
      const nextList = list.concat(score); 
      setList(nextList);
      setNumber("");
    }
    else {
      document.getElementById('toolInput3').value = "";
    }
  };

document.onkeypress = function(e) {
  if(e.keyCode == 13){
    onInsert();
  } 
}

  return (
    <div id="ScorePage">
      <br/><br/>
      <div id="title3">
          <b>학점 평균 계산기</b>
      </div>
      <br/>
      <input id="toolInput3" type={Text} value={number} placeholder="학점 입력(예시: A+) : " onChange={onChange} autoFocus/>
      <button id="toolBtn3" onClick={onInsert}>
          <b>추가</b>
      </button>
      <ul>
        {list.map((value, idx) => (
          <li key={idx}>{value}</li>
        ))}
      </ul>
      <div id="toolText">
        <b>총 평균평점 : </b>
        {getAverage(list).toFixed(2)}
        <br />
        <b>총 과목수 : </b>
        {list.length}
      </div>
    </div>
  );
};

export default ScorePage;