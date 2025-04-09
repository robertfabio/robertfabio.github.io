import { useState } from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>Fábio Gurgel</h1>
        
        <div className="contact-info">
          <a href="mailto:fabio.filho25453@alunos.ufersa.edu.br">
            <i className="fas fa-envelope"></i> fabio.filho25453@alunos.ufersa.edu.br
          </a>
          <a href="https://github.com/robertfabio" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> github.com/robertfabio
          </a>
          <div className="phone">
            <i className="fas fa-phone"></i> +55 84 99215-2351
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;