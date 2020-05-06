import React from 'react';
import { Header, HeaderGenres, GameList } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <HeaderGenres />
        <GameList />
      </main>
    </div>
  );
}

export default App;
