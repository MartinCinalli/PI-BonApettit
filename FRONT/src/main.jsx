import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ScrollToTop from './utils/ScrollToTop.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ScrollToTop/>
        <App />
    </BrowserRouter>
)