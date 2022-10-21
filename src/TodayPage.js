import axios from "axios";
import styled from "styled-components";
import logo from "./Assets/TrackIt.png"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import { Link } from "react-router-dom"
import dayjs from "dayjs";
import check from "./Assets/check.png"


let total = 0;
let total1 = 0;

export default function TodayPage() {

    const [pointerEvents, setPointerEvents] = useState("");
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
       
        total = (newArray.length/habitInfo.length)*100;
        console.log(total)
    }

    contador();

    console.log(habitInfo)
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
          
            <Navbar>
                <Link to="/">
                    <img src={logo} alt="TrackIt Logo" />
                </Link>

                <UserImg src={userInfo.image} alt="Imagem do Usuário" />
            </Navbar>

            <Content>
                <Info>
                    <p>Quinta, 20/10</p>
                    {total === 0 ? <p>Nenhum hábito concluido ainda</p> : <p>{total}% dos hábitos concluidos</p>}
                    
                </Info>


                {habitInfo.map((i) => <Habit 
                setTeste = {setTeste} token={token} id={i.id} key={i.id} done={i.done} sequence={i.currentSequence} record={i.highestSequence} name={i.name} />)} 
            </Content>


            <Footer>
                <p>Hábitos</p>

                <Ellipse><Link to="/hoje">Hoje</Link></Ellipse>

                <p>Histórico</p>
            </Footer>
        </>
    )
}

    function Habit ({ setTeste, token, id, done, sequence, record, name}) {
        const config = "lalala"


        function handleCheck (idHabito, done) {
            if (!done) {
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/check`, config,  { headers: { Authorization: `Bearer ${token}` } })
                .then(res =>setTeste("321"))
                .catch(err => console.log(err.response.data));
               
               setTeste([])
            }

            if (done) {
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}/uncheck`, config,  { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setTeste("321"))
                .catch(err => console.log(err.response.data));
            }
            setTeste([])
        }

        return (

            

            <Habito>
                <HabitoConteudo>
                    <HabitName>{name}</HabitName>
                    <HabitInfo>Sequencia Atual: {sequence} dias</HabitInfo>
                    <HabitInfo>Seu recorde: {record} dias</HabitInfo>
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
const Footer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0; 
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
const HabitInfo = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 13px;
    color: #666666;
`