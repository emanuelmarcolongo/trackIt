import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { TodayContext } from "../../Constants/userContext.js";
import axios from "axios";
import Habit from "./Habit.js";
import Footer from "../../Components/Footer.js";
import NavBar from "../../Components/Navbar";
import { ThreeDots } from "react-loader-spinner";
import { MarginAuto } from "../TodayPage/TodayPage";
import { url } from "../../Constants/urls.js";
import { Weekday } from "./HabitsPage-Components.js";

export default function HabitPage({ config, valor, setValor }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [habits, setHabits] = useState([]);
  const { todayInfo, setTodayInfo } = useContext(TodayContext);
  const [visibilidade, setVisibilidade] = useState("none");
  const [days, setDays] = useState([]);
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [reload, setReload] = useState(0);
  const [disable, setDisable] = useState(false);
  const token = userInfo.token;
  const [habitName, setHabitName] = useState("");
  const [loaded, setLoaded] = useState(false);

  function saveHabit(e) {
    e.preventDefault();
    setDisable(true);

    config.name = habitName;
    config.days = days;
    axios
      .post(
        `${url}/habits`,
        config,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setReload(res.data.id);
        setDisable(false);
        setVisibilidade("none");
        setHabitName("");
      })
      .catch((err) => {
        alert(err.response.data.message);
        setDisable(false);
      });
  }

  useEffect(() => {
    axios
      .get(
        `${url}/habits`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setHabits(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err.response.data));

    axios
      .get(
        `${url}/habits/today`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setTodayInfo(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [reload]);

  return (
    <>
      <NavBar />

      <Content >
        <Header>
          <p> Meus hábitos</p>
          <div onClick={() => setVisibilidade("")}>+</div>
        </Header>

        <CriarHabito>
          <LoginForm
            data-identifier="create-habit-btn"
            visibilidade={visibilidade}
            onSubmit={saveHabit}
          >
            <input
              disabled={disable}
              type="text"
              data-identifier="input-habit-name"
              name="name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Nome do Hábito"
            ></input>
            <WeekDays data-identifier="week-day-btn">
              {weekdays.map((i, idx) => (
                <Weekday
                  visibilidade={visibilidade}
                  disabled={disable}
                  idx={idx}
                  days={days}
                  setDays={setDays}
                  key={idx}
                  dia={i}
                />
              ))}
            </WeekDays>

            <Botoes>
              <p
                data-identifier="cancel-habit-create-btn"
                onClick={() => setVisibilidade("none")}
              >
                Cancelar
              </p>
              <Save
                data-identifier="save-habit-create-btn"
                disabled={disable}
                type="submit"
              >
                {disable ? (
                  <ThreeDots
                    height="30"
                    width="80"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  "Salvar"
                )}
              </Save>
            </Botoes>
          </LoginForm>

          {habits.length >= 1 ? (
            " "
          ) : (  
            <DefaultMessage data-identifier="no-habit-message">
                {!loaded && (
            <MarginAuto>
                <ThreeDots
            align-self='center'
              height="20%"
              width="50%"
              margin='0 auto'
              radius="9"
              color="blue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
            </MarginAuto>
          )}
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </DefaultMessage>
          )}
          {habits.map((item) => (
            <Habit setReload={setReload} key={item.id} habit={item}></Habit>
          ))}
        </CriarHabito>
      </Content>

      <Footer valor={valor} />
    </>
  );
}



const Content = styled.div`
  margin-top: 71px;
  margin-bottom: 5%;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ebebeb;
`;
const CriarHabito = styled.div`
  width: 340px;
  height: 100%;
  margin: 0 auto 100px;
  display: flex;
  flex-direction: column;
  > p {
    margin-top: 50px;
  }
`;
const Header = styled.div`
  display: flex;
  width: 340px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 30px;
  p {
    font-family: "Lexend Deca", sans-serif;
    color: #126ba5;
    font-size: 23px;
    font-weight: 600;
  }
  div {
    width: 40px;
    height: 35px;
    border-radius: 4.6px;
    background-color: #52b6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: white;
  }
`;
export const WeekDays = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Save = styled.button`
  font-family: "Lexend Deca", sans-serif;
  height: 45px;
  border-radius: 4.5px;
  background-color: #52b6ff;
  font-size: 21px;
  color: #fff;
  img {
    width: 30px;
    height: 30px;
    color: white;
  }
`;
const LoginForm = styled.form`
  font-family: "Lexend Deca", sans-serif;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 340px;
  background-color: white;
  border-radius: 5px;
  display: ${(props) => props.visibilidade};
  input {
    font-family: "Lexend Deca", sans-serif;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    margin-bottom: 6px;
    ::placeholder {
      font-family: "Lexend Deca", sans-serif;
      color: #dbdbdb;
      font-size: 20px;
    }
  }
  button {
    font-family: "Lexend Deca", sans-serif;
    height: 35px;
    width: 84px;
    border-radius: 4.5px;
    background-color: #52b6ff;
    font-size: 16px;
    color: #fff;
    border: none;
  }
`;
const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 25px;
  cursor: pointer;
  p {
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
    color: #52b6ff;
    margin-right: 20px;
  }
`;
const DefaultMessage = styled.p`
  font-size: 18px;
  color: #666;
  font-weight: 500;
`;
