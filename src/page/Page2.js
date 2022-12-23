function aler() {
    document.getElementById("gText").innerHTML = "클릭";
    alert("클릭");
}

function Page2() {
    let a = 10;

    return (
        <div>
            도구페이지
            <input id="gText" type={Text} style={{width: "150px", height: "30px", backgroundColor: "#7d9a08"}}/>
            <br/>
            <button id="tool" onClick={aler} style={{width: "100px", height: "30px", backgroundColor: "#a0c808"}}>
                <b>클릭 </b>
            </button>
        </div>
    );
}

export default Page2;