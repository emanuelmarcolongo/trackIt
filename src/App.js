import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import RegisterPage from "./RegisterPage";
import MainPage from "./MainPage";
import { TodayContext, UserContext } from "./userContext";
import { useState } from "react";
import TodayPage from "./TodayPage";
import HistoryPage from "./HistoryPage";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [todayInfo, setTodayInfo] = useState({});
  const config = { name: "", days: [] };
  const registerBody = { email: "", name: "", image: "", password: "" };
  const [valor, setValor] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <TodayContext.Provider value={{ todayInfo, setTodayInfo }}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/cadastro"
                element={<RegisterPage body={registerBody} />}
              />
              <Route
                path="/habitos"
                element={
                  <MainPage valor={valor} setValor={setValor} config={config} />
                }
              />
              <Route
                path="/hoje"
                element={<TodayPage valor={valor} setValor={setValor} />}
              />
              <Route
                path="/historico"
                element={<HistoryPage valor={valor} setValor={setValor} />}
              />
            </Routes>
          </TodayContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
