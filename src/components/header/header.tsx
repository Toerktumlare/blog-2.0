import React from "react"

const Header = () => {
  return (
    <header className="terminal-nav">
      <div className="terminal-logo">
        <div className="logo terminal-prompt">
          <div className="menu-item">/home/toerktumlare/</div>
        </div>
      </div>
      <nav className="terminal-menu">
        <ul>
          <li>
            <div className="menu-item">/home</div>
          </li>
          <li>
            <div className="menu-item">/about</div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
