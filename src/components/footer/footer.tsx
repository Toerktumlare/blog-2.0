import React from "react"
import styled from "styled-components"

const Footer: React.FC = () => {
  return (
    <footer>
      <FooterText>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="http://www.github.com/tandolf">toerktumlare</a>
      </FooterText>
    </footer>
  )
}

const FooterText = styled.h3`
    font-size: 14px;
    padding-bottom: 10px;
`;

export default Footer