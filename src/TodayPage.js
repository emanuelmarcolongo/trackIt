import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import check from "./Assets/check.png"
import NavBar from "./Navbar";
import Footer from "./Footer"

let total = 0;
let total1 = 0;

export default function TodayPage() {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const token = userInfo.token;
    const [habitInfo, setHabitInfo] = useState([])
    const [teste, setTeste] = useState("")


    const config = {
        name: "",
        days: ""
    }

    function contador () {
        const newArray = habitInfo.filter((i) => i.done);
       
        total = Math.round((newArray.length/habitInfo.length)*100);
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
            <NavBar/>
            

            <Content>
                <Info>
                    <p>Quinta, 20/10</p>
                    {(total === 0 || isNaN(total))? <p>Nenhum hábito concluido ainda</p> : <p>{total}% dos hábitos concluidos</p>}
                    
                </Info>


                {habitInfo.map((i) => <Habit 
                setTeste = {setTeste} token={token} id={i.id} key={i.id} done={i.done} sequence={i.currentSequence} record={i.highestSequence} name={i.name} />)} 
            </Content>


            <Footer/>
        </>
    )
}

    function Habit ({ setTeste, token, id, done, sequence, record, name}) {

        const [color, setColor] = useState("#666666");
        const [record1, setRecord1] = useState(false)


        function handleCheck (idHabito, done) {
            if (!done) {

                if(sequence >= record) {
                    setRecord1(true)
                }
    
                setColor("#8FC549")
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/check`, {},  { headers: { Authorization: `Bearer ${token}` } })
                .then(res =>setTeste("321"))
                .catch(err => console.log(err.response.data));
               
               setTeste([])
            }

            if (done) {
                if(sequence <= record) {
                    setRecord1(false)
                }
                setColor("#666")

                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/uncheck`, {},  { headers: { Authorization: `Bearer ${token}` } })
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
                <Checkbox  onClick={()=> handleCheck(id, done)} done={done}>
                    <img src={check} alt="checksymbol"/>
                </Checkbox>
            </Habito>

        )
    }


const Navbar = styled.div`

    background-color: #126BA5;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0; 
    left: 0;
`
const Ellipse = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 91px;
    width: 91px;
    font-size: 18px;
    border-radius: 50%;
    color: white;
    background-color: #52B6FF;
    position: absolute;
    bottom: 15px;
`
const UserImg = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
`
const Content = styled.div `
    font-family: 'Lexend Deca', sans-serif;
    display: flex; 
    align-items: center;
    flex-direction: column;
    margin-top: 90px;
    margin-bottom: 200px;
 
`
const Info = styled.div`
 font-family: 'Lexend Deca', sans-serif;
   font-size: 20 px;
   margin-bottom: 60px;
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
        color: ${props => props.record ? "#8FC549": "#666"};
    }
    
`
