import './App.css';
import NewsList from './pages/NewsList/NewsList';
import NewsItem from './pages/NewsItem/NewsItem'
import Navbar from './components/Navbar/Navbar'
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
