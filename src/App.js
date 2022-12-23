import React from 'react';
import { Route, Routes, Link } from "react-router-dom";

import Home from './page/Home';
import Page1 from './page/Page1';
import Page2 from './page/Page2';
import Page3 from './page/Page3';
import Ref from './page/Ref';
import './page/css/App.css';


function App() {
  return (
    <div className="App">
      <nav>
        <ul id="menuCss">
          <li><Link id="menuLi" to="/">홈</Link></li>
          <li><Link id="menuLi" to="/page1">학교 페이지</Link></li>
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
