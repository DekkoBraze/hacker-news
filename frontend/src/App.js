import './App.css';
import News from './pages/News';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
