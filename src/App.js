import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import GlobalStyle from './globalStyles';
import RegisterPage from "./RegisterPage";
import MainPage from "./MainPage";
import { UserContext } from "./userContext";
import { useState } from "react";
import TodayPage from "./TodayPage";
import HistoryPage from "./HistoryPage"

function App() {

  const [userInfo, setUserInfo] = useState({})
  const config = {name: "", days: []}


  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <Routes>

            <Route path="/" element={<LoginPage />} />


            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/habitos" element={<MainPage config={config}/>} />
            <Route path="/hoje" element={<TodayPage/>} />
            <Route path="/historico" element={<HistoryPage/>} />
            
          </Routes>
        </UserContext.Provider>
  
      </BrowserRouter>

    </div>
  );
}

export default App;
