import React, { ReactNode } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { AttentionBox, BoxType, Content, Header, Icon } from "./AttentionBox.js"

const InfoBox = ({ children }: InfoProps) => {
  const backgroundColor = 'var(--info-color)';
  const borderColor = 'var(--dark-info-color)';
  const textColor = 'var(--font-dark-color)';
  return (
    <AttentionBox boxtype={BoxType.INFO}>
      <Header>
        <Icon>
          <AiOutlineInfoCircle size={25} style={{ verticalAlign: 'middle' }} />
        </Icon>
        info
      </Header>
      <Content>
        {children}
      </Content>
    </AttentionBox>
  )
}

interface InfoProps {
  children: ReactNode
}

export default InfoBox;