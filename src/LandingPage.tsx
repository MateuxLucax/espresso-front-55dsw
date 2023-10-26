import React from 'react';
import logo from './assets/svg/logo.svg';
import './LandingPage.scss';

function LandingPage() {
  return (
    <>
      <main>
        <section>
          <img src={logo} alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')" />
          <div className="title">
            <h1>descubra o mundo do <span>café</span></h1>
            <h2>compartilhando e explorando receitas com apaixonados por café como você!</h2>
          </div>
          <div className="scrollDown">
            <span>&nbsp;</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
