import React, { type ReactNode } from "react"
import { BiErrorAlt } from "react-icons/bi";
import { AttentionBox, BoxType, Content, Header, Icon } from "./AttentionBox.js"

export default function DangerBox({ children }: DangerProps) {
  return (
    <AttentionBox boxtype={BoxType.DANGER}>
      <Header>
        <Icon>
          <BiErrorAlt size={25} style={{ verticalAlign: 'middle' }} />
        </Icon>
        danger
      </Header>
      <Content>
        {children}
      </Content>
    </AttentionBox>
  )
}

interface DangerProps {
  children: ReactNode
}