import * as React from "react"
import Header from "./header"
import styled from "styled-components"
import { GlobalStyle } from "../pages";
import Footer from "./footer";
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from './codeBlock'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 70rem;
  background-color: var(--background-color);
  color: var(--font-color);
`;

const components = {
  pre: CodeBlock
}

const Layout = ({ children }: any) => {

  return (
      <Wrapper>
        <GlobalStyle />
        <MDXProvider components={components} >
        <Header />
        <main>{children}</main>
        <Footer />
        </MDXProvider>
      </Wrapper>
  )
}

export default Layout
