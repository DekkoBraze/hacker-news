import './App.css';
import NewsList from './pages/NewsList';
import NewsItem from './pages/NewsItem'
import Navbar from '../src/components/navbar'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<NewsList />} />
        <Route path="/item/:newsItemPk" exact element={<NewsItem />} />
      </Routes>
    </div>
  );
}

export default App;
