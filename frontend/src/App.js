import './App.css';
import NewsList from './pages/NewsList';
import NewsItem from './pages/NewsItem'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact element={<NewsList />} />
        <Route path="/item/:newsItemPk" exact element={<NewsItem />} />
      </Routes>
    </div>
  );
}

export default App;
