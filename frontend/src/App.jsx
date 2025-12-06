import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesList from './pages/ArticlesList';
import ArticleDetail from './pages/ArticleDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;