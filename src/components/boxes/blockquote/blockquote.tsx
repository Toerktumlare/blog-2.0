import React, { type ReactNode } from "react"
import { FaQuoteLeft } from "react-icons/fa";
import { AttentionBox, BoxType, Content, Footer, Header } from "../AttentionBox";

export default function Blockquote({ children, source }: QuoteProps) {
  return (
    <AttentionBox boxtype={BoxType.QUOTE}>
      <div>
        <Header>
          <FaQuoteLeft size={35} style={{ verticalAlign: 'middle' }} />
        </Header>
      </div>
      <Content>
        {children}
      </Content>
      {source ? <Footer>
        {source}
      </Footer> : null}
    </AttentionBox>
  )
}

interface QuoteProps {
  source: string,
  children: ReactNode
}
