import { useState } from 'react';
import './App.css';
import Home from './components/home-landing';
import Prompt from './components/poem-prompt';

function App() {

  const [pageChange, setPageChange] = useState(true)


  return (
    <div className="App">
      { pageChange ? <Home setPageChange={setPageChange} /> : <Prompt  /> }
    </div>
  );
}

export default App;
