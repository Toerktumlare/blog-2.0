import React from "react"

export default function Footer() {
  return (
    <footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="http://www.github.com/toerktumlare">toerktumlare</a>
    </footer>
  )
}
