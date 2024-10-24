import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import Comics from './components/Comics';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css';

function App() {

  return (
    <div className='appContainer'>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/browse-characters' element={<BrowseCharacters />} />
        <Route path='/character-details/:id' element={<CharacterDetails />} />
        <Route path='/comics' element={<Comics />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
