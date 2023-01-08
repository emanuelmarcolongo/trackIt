import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import check from "../../Assets/imgs/check.png"

export function TodayHabit({ setUpdate, token, id, done, sequence, record, name }) {
    const [color, setColor] = useState("#666666");
    const [isRecord, setIsRecord] = useState(false);
  
    useEffect(() => {
      if ((sequence = record)) {
        setIsRecord(true);
      } else if (sequence < record || record === 0) {
        setIsRecord(false);
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
            setIsRecord(true);
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
            setIsRecord(false);
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
          <HabitInfoRec record={isRecord}>
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