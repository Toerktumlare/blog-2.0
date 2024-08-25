import React, { type ReactNode } from "react"
import { AiOutlineWarning } from "react-icons/ai";
import { AttentionBox, BoxType, Content, Header, Icon } from "./AttentionBox.js"
import styles from "./warningBox.module.css"

const WarningBox = ({ children }: WarningProps) => {
  return (
    <AttentionBox boxtype={BoxType.WARNING}>
      <Header>
        <Icon>
          <AiOutlineWarning size={25} style={{ verticalAlign: 'middle' }} />
        </Icon>
        warning
      </Header>
      <Content className={ styles.content }>
        {children}
      </Content>
    </AttentionBox>
  )
}

interface WarningProps {
  children: ReactNode
}

export default WarningBox;