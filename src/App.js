import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./Constants/globalStyles.js";
import HabitPage from "./HabitPage.js";
import { TodayContext, UserContext } from "./userContext";
import { useState } from "react";
import TodayPage from "./TodayPage";
import HistoryPage from "./HistoryPage";
import SignInPage from "./Pages/SignInPage/SignIn-Page.js";
import SignUpPage from "./Pages/SignUpPage/SignUp-Page.js";


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
              <Route path="/" element={<SignInPage />} />
              <Route
                path="/cadastro"
                element={<SignUpPage body={registerBody} />}
              />
              <Route
                path="/habitos"
                element={
                  <HabitPage valor={valor} setValor={setValor} config={config} />
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
