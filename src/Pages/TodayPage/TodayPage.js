import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import NavBar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";
import { url } from "../../Constants/urls";
import { TodayHabit } from "./TodayPageComponents.js";
import { Link } from "react-router-dom";

export default function TodayPage({ valor, setValor }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  require('dayjs/locale/pt-br');
  const token = userInfo.token;
  const [habitList, setHabitList] = useState([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const dia = dayjs().locale("pt-br").format("dddd, D/M");
  const [loaded, setLoaded] = useState(false);

  function completedTasksPercentage() {
    const doneTasks = habitList.filter((i) => i.done);
    setValor(Math.round((doneTasks.length / habitList.length) * 100));
  }

  completedTasksPercentage();

  useEffect(() => {
    axios
      .get(
        `${url}/habits/today`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setHabitList(res.data);
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
            <LoaderContainer>
             <ThreeDots
              width='150px'
              margin-bottom='2000px'
              radius="20"
              color="blue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
            <p style={{color: 'blue'}}>Buscando...</p>
            </LoaderContainer>
               

          )}

          {loaded && habitList.length !== 0  ? (
            <p style={{color: "#8fc549"}} data-identifier="today-infos">
            {valor}% dos hábitos concluidos
          </p>
          ) : (
            <></>
          )}

          {loaded && habitList.length === 0  ? (
            <p style={{justifyContent: 'center'}}>
            Parece que você não tem nenhum hábito hoje.<br></br>
            <Link to='/habitos'>Adicionar Hábito</Link>
          </p>
          ) : (
            <></>
          )}

        </Info>

        {habitList.map((i) => (
          <TodayHabit
            setUpdate={setUpdateEffect}
            token={token}
            id={i.id}
            done={i.done}
            sequence={i.currentSequence}
            record={i.highestSequence}
            name={i.name}
            key={i.id}
          />
        ))}
      </Content>

      <Footer valor={valor} />
    </Container>
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
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const MarginAuto = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 30%;
    margin-bottom: 100vh;
`

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`