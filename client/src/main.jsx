import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home_Page_content from './Home_page_content.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Home_Page_content />
    <Footer />
  </StrictMode>,
)
