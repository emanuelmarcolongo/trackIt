import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle/>
        <Routes>
          <Route path="/" element= { <LoginPage/>}/>
          <Route path="/cadastro" element= { <RegisterPage/>}/>
        </Routes>
       
      </BrowserRouter>
     
    </div>
  );
}

export default App;
