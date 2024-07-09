import { AppRouter } from './Routes/AppRouter';
import { AuthProvider } from './Context/Auth/AuthContext';
import { ContextProvider } from './Context';
import { Footer, Navbar } from './Layouts';
import './App.css'
import { SearchProvider } from './Context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <ContextProvider>
          <Navbar/>
          <AppRouter/>
          <Footer/>
        </ContextProvider>
      </AuthProvider>
    </SearchProvider>
  )
}

export default App
