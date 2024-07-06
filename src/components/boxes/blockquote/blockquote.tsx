import React, { type ReactNode } from "react"
import { FaQuoteLeft } from "react-icons/fa";

export default function Blockquote({ children, source }: QuoteProps) {
  return (
    <div>
      <div>
        <div>
          <FaQuoteLeft size={35} style={{ verticalAlign: 'middle' }} />
        </div>
      </div>
      <div>
        {children}
      </div>
      {source ? <footer>
        {source}
      </footer> : null}
    </div>
  )
}

interface QuoteProps {
  source: string,
  children: ReactNode
}
