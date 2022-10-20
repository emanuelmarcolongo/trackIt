import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import GlobalStyle from './globalStyles';
import RegisterPage from "./RegisterPage";
import MainPage from "./MainPage";
import { UserContext } from "./userContext";
import { useState } from "react";
import TodayPage from "./TodayPage";


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
            <Route path="/hoje" element={<TodayPage/>} />
            
          </Routes>
        </UserContext.Provider>
  
      </BrowserRouter>

    </div>
  );
}

export default App;
