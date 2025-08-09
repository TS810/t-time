import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './main.css'

import About from '../src/pages/about'
import Schedule from '../src/pages/schedule'
import TTime from '../src/pages/t-time'
import Birthday from '../src/pages/hbd'
import Interview from '../src/pages/interview'
import Comment from '../src/pages/comment'

function App() {
  const [menuVisible, setMenuVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuVisible(false)  // 페이지 이동될 때 메뉴 닫기
  }, [location])

  return (
    <>
      <button
        className="menu-btn"
        id="menuBtn"
        style={{ display: menuVisible ? 'none' : 'block' }}
        onClick={() => setMenuVisible(true)}
      >
        {'>>'}
      </button>

      <div className={`menu-bar ${menuVisible ? 'show' : ''}`} id="menuBar">
        <span
          className="close-btn"
          id="closeBtn"
          onClick={() => setMenuVisible(false)}
          style={{ cursor: 'pointer' }}
        >
          ✖
        </span>

        <ul>
          <li><Link to="/hbd">BEE HAPPY birthday, TS!</Link></li>
          <li><Link to="/t-time">TㅡTime</Link></li>
          <li><Link to="/about">t-time.xyz</Link></li>
          {/* <li><Link to="/schedule">스케줄 | Schedule</Link></li> */}
          <li><Link to="/interview">10039192</Link></li>
          {/* <li style={{opacity:"15%"}}><Link to="/comment">-</Link></li> */}
        </ul>

        <span id="myID">@eehdrhdiddl</span>
      </div>
      {location.pathname === '/' && (
        <>
          <div className="main-text" style={{ margin: '0 0 0 23vw' }}>T</div>
          <div className="main-text" style={{ margin: '70vh 0 0 70vw' }}>ㅡtime!</div>
        </>
      )}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/t-time" element={<TTime />} />
        <Route path="/hbd" element={<Birthday />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </>
  )
}

export default App