import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Cookbooks from './components/Cookbooks';
function App() {
  return (
    <div>
      <Link to='/'> <h1>Authors</h1></Link>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Cookbooks />} />
     </Routes>
    </div>
  );
}

export default App;
