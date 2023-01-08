import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import check from "./Assets/imgs/check.png";
import NavBar from "./Navbar";
import Footer from "./Constants/Footer";
import dayjs from "dayjs";
import locale from "../node_modules/dayjs/locale/pt-br";
import { ThreeDots } from "react-loader-spinner";

export default function TodayPage({ valor, setValor }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const token = userInfo.token;
  const [habitInfo, setHabitInfo] = useState([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const dia = dayjs().locale("pt-br").format("dddd, D/M");
  const [loaded, setLoaded] = useState(false);

  function completedTasksPercentage() {
    const doneTasks = habitInfo.filter((i) => i.done);
    setValor(Math.round((doneTasks.length / habitInfo.length) * 100));
  }

  completedTasksPercentage();

  useEffect(() => {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setHabitInfo(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err.response.data));
  }, [updateEffect, valor]);

  return (
    <Container>
      <NavBar />

      <Content data-identifier="today-infos">
        <Info>
          <span data-identifier="today-infos">
            <p>{dia}</p>
          </span>

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

        {(valor === 0 || isNaN(valor)) ? (
            <p>Nenhum hábito concluido ainda</p>
          ) : (
            <ProgressMessage data-identifier="today-infos">
              {valor}% dos hábitos concluidos
            </ProgressMessage>
          )}
        </Info>

        {habitInfo.map((i) => (
          <Habit
            setUpdate={setUpdateEffect}
            teste={updateEffect}
            token={token}
            id={i.id}
            key={i.id}
            done={i.done}
            sequence={i.currentSequence}
            record={i.highestSequence}
            name={i.name}
          />
        ))}
      </Content>

      <Footer valor={valor} />
    </Container>
  );
}

function Habit({ setUpdate, token, id, done, sequence, record, name }) {
  const [color, setColor] = useState("#666666");
  const [record1, setRecord1] = useState(false);

  useEffect(() => {
    if ((sequence = record)) {
      setRecord1(true);
    } else if (sequence < record || record === 0) {
      setRecord1(false);
    }
    if (!done) {
      setColor("#666");
    } else if (done) {
      setColor("#8FC549");
    }
  }, []);

  function handleCheck(idHabito, done) {
    if (!done) {
      setColor("#8FC549");
      if (sequence === record) {
        setRecord1(true);
      }

      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/check`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => setUpdate(true))
        .catch((err) => console.log(err.response.data));

      setUpdate([false]);
    }

    if (done) {
      setColor("#666");
      if (record > sequence || record === 1) {
        setRecord1(false);
      }

      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/uncheck`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => setUpdate(true))
        .catch((err) => console.log(err.response.data));
    }
    setUpdate([false]);
  }

  return (
    <Habito>
      <HabitoConteudo>
        <HabitName>{name}</HabitName>
        <HabitInfoSeq color={color}>
          Sequencia Atual:{" "}
          <span>
            {sequence} {sequence === 1 ? "dia" : "dias"}
          </span>
        </HabitInfoSeq>
        <HabitInfoRec record={record1}>
          Seu recorde:{" "}
          <span>
            {record} {record === 1 ? "dia" : "dias"}
          </span>
        </HabitInfoRec>
      </HabitoConteudo>
      <Checkbox
        data-identifier="done-habit-btn"
        onClick={() => handleCheck(id, done)}
        done={done}
      >
        <img src={check} alt="checksymbol" />
      </Checkbox>
    </Habito>
  );
}

const Container = styled.div`
  background-color: #EBEBEB;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
`

const Content = styled.div`
  font-family: "Lexend Deca", sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 0px;
  margin-bottom: 200px;
`;
const Info = styled.div`
  display: flex;
  width: 340px;
  flex-direction: column;
  justify-content: center;
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  color: #666;
  margin-bottom: 60px;
  span {
    color: #126ba5;
    font-size: 23px;
    margin-bottom: 15px;
  }
`;
const Habito = styled.div`
  box-sizing: border-box;
  width: 340px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border: 1px solid #666666;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 15px;
`;
const HabitoConteudo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.done ? "#8FC549;" : "#EBEBEB")};
`;
const HabitName = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-size: 20 px;
  color: #666666;
`;
const HabitInfoSeq = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-size: 13px;
  color: #666666;
  span {
    color: ${(props) => props.color};
  }
`;
const HabitInfoRec = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-size: 13px;
  color: #666;
  span {
    color: ${(props) => (props.record ? "#8FC549" : "#666")};
  }
`;
const ProgressMessage = styled.p`
  color: #8fc549;
`;

export const MarginAuto = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 30%;
    margin-bottom: 100vh;
`