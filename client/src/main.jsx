import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home_page_content from './Home_page_content.jsx';
import Enquire from './Enquire.jsx';
import About_me from './About_me.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';


const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home_page_content />} />
      <Route path="/home" element={<Home_page_content />} />
      <Route path="/enquire" element={<Enquire />} />
      <Route path="/about" element={<About_me />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
