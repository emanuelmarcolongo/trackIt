import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import GlobalStyle from './globalStyles';
import RegisterPage from "./RegisterPage";
import MainPage from "./MainPage";
import { UserContext } from "./userContext";
import { useContext, useEffect, useState } from "react";


function App() {

  const [userInfo, setUserInfo] = useState({})


  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <Routes>

            <Route path="/" element={<LoginPage />} />


            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/habitos" element={<MainPage/>} />
            
          </Routes>
        </UserContext.Provider>
  
      </BrowserRouter>

    </div>
  );
}

export default App;
