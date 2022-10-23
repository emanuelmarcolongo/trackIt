import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import check from "./Assets/check.png"
import NavBar from "./Navbar";
import Footer from "./Footer"
import dayjs from "dayjs";
import locale from "../node_modules/dayjs/locale/pt-br"

export default function TodayPage({ valor, setValor }) {
   

    const { userInfo, setUserInfo } = useContext(UserContext);
    const token = userInfo.token;
    const [habitInfo, setHabitInfo] = useState([])
    const [teste, setTeste] = useState("")
    const dia = (dayjs().locale("pt-br").format("dddd, D/M"));



    function contador() {
        const newArray = habitInfo.filter((i) => i.done);
        setValor(Math.round((newArray.length / habitInfo.length) * 100));
    }

    contador();

    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setHabitInfo(res.data)
                contador();
            })
            .catch(err => console.log(err.response.data))
    }, [teste])


    return (
        <>
            <NavBar />


            <Content data-identifier="today-infos">
                <Info>
                    <span data-identifier="today-infos" ><p>{dia}</p></span>
                    {(valor === 0 || isNaN(valor)) ? <p>Nenhum hábito concluido ainda</p> : <ProgressMessage data-identifier="today-infos">{valor}% dos hábitos concluidos</ProgressMessage>}

                </Info>


                {habitInfo.map((i) => <Habit
                    setTeste={setTeste} teste={teste} token={token} id={i.id} key={i.id} done={i.done} sequence={i.currentSequence} record={i.highestSequence} name={i.name} />)}
            </Content>


            <Footer valor={valor} />
        </>
    )
}

function Habit({ setTeste, token, id, done, sequence, record, name }) {

    const [color, setColor] = useState("#666666");
    const [record1, setRecord1] = useState(false)


    useEffect(() => {
        if (sequence = record) {
            setRecord1(true);
        }
        else if (sequence < record || record=== 0) {
            setRecord1(false);
        }
        if (!done) {
            setColor("#666")
        } else if (done) {
            setColor("#8FC549");
        }
    }, [])


    function handleCheck(idHabito, done) {
        if (!done) {
            setColor("#8FC549");
            if (sequence === record) {
                setRecord1(true)
            }

            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/check`, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setTeste("321"))
                .catch(err => console.log(err.response.data));

            setTeste([])
        }

        if (done) {
        
            setColor("#666");
            if (record > sequence || record === 1) {
                setRecord1(false)
            }
          
           
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/uncheck`, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setTeste("321"))
                .catch(err => console.log(err.response.data));
        }
        setTeste([])
    }

    return (
        <Habito>
            <HabitoConteudo>
                <HabitName>{name}</HabitName>
                <HabitInfoSeq color={color}>Sequencia Atual: <span>{sequence} {sequence === 1 ? "dia" : "dias"}</span></HabitInfoSeq>
                <HabitInfoRec record={record1}>Seu recorde: <span>{record} {record === 1 ? "dia" : "dias"}</span></HabitInfoRec>
            </HabitoConteudo>
            <Checkbox data-identifier="done-habit-btn" onClick={() => handleCheck(id, done)} done={done}>
                <img src={check} alt="checksymbol" />
            </Checkbox>
        </Habito>

    )
}


const Content = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    display: flex; 
    align-items: center;
    flex-direction: column;
    margin-top: 90px;
    margin-bottom: 200px;
 
`
const Info = styled.div` 
    display: flex;
    width: 340px;
    flex-direction: column;
    justify-content: flex-start;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #666;
    margin-bottom: 60px;
    span {
        color: #126BA5;
        font-size: 23px;
        margin-bottom: 15px;
    }
`
const Habito = styled.div`
    box-sizing: border-box;
    width: 340px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    border: 1px solid #666666;
    margin-bottom: 30px;
`
const HabitoConteudo = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: flex-start;
`
const Checkbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 69px;
    height: 69px;
    background-color: ${props => props.done ? "#8FC549;" : "#EBEBEB"};
`
const HabitName = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20 px;
    color: #666666;
`
const HabitInfoSeq = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 13px;
    color: #666666;
    span {
        color: ${props => props.color}
    }
`
const HabitInfoRec = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 13px;
    color: #666;
    span {
        color: ${props => props.record ? "#8FC549" : "#666"};
    }
    
`
const ProgressMessage = styled.p`
    color: #8FC549;
`
