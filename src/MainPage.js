import styled from "styled-components"
import logo from "./Assets/TrackIt.png"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import { Link } from "react-router-dom"
import axios from "axios"
import Habit from "./Habit"


export default function MainPage() {


    const [habits, setHabits] = useState([])
    const { userInfo, setUserInfo } = useContext(UserContext);
    let lalala = false;

    const token = userInfo.token;
    const config = {
        name: "Hábito Teste",
        days: [1, 3, 5] // segunda, quarta e sexta
    }

    function saveHabit (e) {
        e.preventDefault();
    }

    useEffect(()=> {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            setHabits(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err.response.data))
    }, [])

    function handleCreateHabit () {
      lalala = true;

    }


    return (
        <>
            <Navbar>
                <Link to="/">
                    <img src={logo} alt="TrackIt Logo" />
                </Link>

                <UserImg src={userInfo.image} alt="Imagem do Usuário" />
            </Navbar>
            <Content>
                <Header>
                    <p> Meus hábitos</p>
                    <div onClick={handleCreateHabit} >+</div>
                </Header>

                <CriarHabito >
                  
                    <LoginForm onSubmit = {saveHabit}>
                        <input type="text" name="name" placeholder="Nome do Hábito"></input>
                        <WeekDays>
                            <WeekDay>D</WeekDay>
                            <WeekDay>S</WeekDay>
                            <WeekDay>T</WeekDay>
                            <WeekDay>Q</WeekDay>
                            <WeekDay>Q</WeekDay>
                            <WeekDay>S</WeekDay>
                            <WeekDay>S</WeekDay>
                        </WeekDays>

                        <Save type="submit">Salvar</Save>
                    </LoginForm>


                    {habits.map((item) => <Habit key={item.id} habit={item}></Habit>)}


                    {habits.length >= 1 ? " ": <p >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> }
                   
                </CriarHabito>

            </Content>
            <Footer>
                <p>Hábitos</p>
                <Ellipse>Hoje</Ellipse>
                <p>Histórico</p>
            </Footer>
        </>


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
const Content = styled.div`
    margin-top: 100px;
    margin-bottom: 100px;
    width: 100%;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    p {
        font-family: 'Lexend Deca', sans-serif;
        color: #126BA5;
        font-size: 23px;
    }
    div {
        width: 40px;
        height: 35px;
        border-radius: 4.6px;
        background-color: #52B6FF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: white;
    }
`
const UserImg = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
`
const CriarHabito = styled.div`
    width: 340px;
    height: 180px;
    margin: 0 auto;
    display: flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: center;
    p {
    }
`
export const WeekDays = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    :nth-child(2n) {
        background-color: #CFCFCF;
        color: white;
    }
`
export const WeekDay = styled.li`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    font-size: 20px;
    color: #DBDBDB;
    border: 1px solid #DBDBDB;
    border-radius: 5px;
`

const Save = styled.button`
         font-family: 'Lexend Deca', sans-serif;
         height: 45px;
         border-radius: 4.5px;
         background-color: #52B6FF;
         font-size: 21px;
         color: #fff;
`
const LoginForm = styled.form`
     font-family: 'Lexend Deca', sans-serif;
     display: flex; 
     flex-direction: column;
     justify-content: center;
     width: 303px;
     display: none;
     input {
         height: 45px;
         border: 1px solid #D4D4D4;
         border-radius: 5px;
         margin-bottom: 6px;
         ::placeholder {
             font-family: 'Lexend Deca', sans-serif;
          color: #DBDBDB;
          font-size: 20px;
         }
     }
     button {
         font-family: 'Lexend Deca', sans-serif;
         height: 45px;
         border-radius: 4.5px;
         background-color: #52B6FF;
         font-size: 21px;
         color: #fff;
     }
`