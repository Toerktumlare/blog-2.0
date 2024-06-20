import React from 'react';
import Header from './components/header/header';
import LayoutWrapper from './components/layout/layoutWrapper.tsx';
import Main from './components/main/main.tsx';
import { standard } from "./button.module.css";

if (!window.IS_PRODUCTION) {
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
}

function MyButton({ title }: { title: string }) {
  return (
  <div>
    <button className={standard}><h4>{title}</h4></button>
    <h4>
      This is a h4 header internal
    </h4>
    </div>
  );
}

const App = () => {
  return (
    <LayoutWrapper>
      <Main>
        <Header />
        foobar
      </Main>
    </LayoutWrapper>
  );
};

export default App;
