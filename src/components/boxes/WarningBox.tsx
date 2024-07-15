import React, { ReactNode } from "react"
import { AiOutlineWarning } from "react-icons/ai";
import { AttentionBox, BoxType, Content, Header, Icon } from "./AttentionBox"

const WarningBox = ({ children }: WarningProps) => {
  const backgroundColor = 'var(--warning-color)';
  const borderColor = 'var(--dark-warning-color)';
  const textColor = 'var(--font-dark-color)';
  return (
    <AttentionBox boxtype={BoxType.WARNING}>
      <Header>
        <Icon>
          <AiOutlineWarning size={25} style={{ verticalAlign: 'middle' }} />
        </Icon>
        warning
      </Header>
      <Content>
        {children}
      </Content>
    </AttentionBox>
  )
}

interface WarningProps {
  children: ReactNode
}

export default WarningBox;