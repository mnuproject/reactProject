import chatBot from './img/imgChatbot.png';
import './css/Home.css'

function Home() {
    return (
        <section className='home'>
            <div>
                <div id="chat">
                    <div id="chatMsg"><b>챗 봇</b></div>
                </div>
                <input id="searchText" type={'text'} />
                <button id="searchBtn"><b>검색</b></button>
            </div>
            <img id="chatBot" src={chatBot}/>            
        </section>
    );
}

export default Home;