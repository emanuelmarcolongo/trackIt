import styled from "styled-components"
import logo from "./Assets/TrackIt.png"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import { Link } from "react-router-dom"
import axios from "axios"
import Habit from "./Habit"
import Footer from "./Footer"


export default function MainPage() {


    const [habits, setHabits] = useState([])
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [visibilidade, setVisibilidade] = useState("none");
    const [days, setDays] = useState([]);
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [reload, setReload] = useState(0);

    const token = userInfo.token;
   
    const config = {
        name: "",
        days: days
    }
    

    function saveHabit(e) {
        e.preventDefault();
       

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setReload(res.data.id))
            .catch(err => console.log(err.response.data.message))
    }

    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setHabits(res.data)
            })
            .catch(err => console.log(err.response.data))
    }, [reload])




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
                    <div onClick={() => setVisibilidade("")} >+</div>
                </Header>

                <CriarHabito >
                    <LoginForm visibilidade={visibilidade} onSubmit={saveHabit}>
                        <input type="text" name="name" onChange={(e) => config.name = e.target.value} placeholder="Nome do Hábito"></input>
                        <WeekDays>
                            {weekdays.map((i, idx) => <Weekday idx={idx} days={days} setDays={setDays} key={idx} dia={i} />)}

                        </WeekDays>

                        <Botoes>
                            <p onClick={() => setVisibilidade("none")} >Cancelar</p>
                            <Save type="submit">Salvar</Save>
                        </Botoes>
                    </LoginForm>


                    {habits.length >= 1 ? " " : <DefaultMessage >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</DefaultMessage>}

                    {habits.map((item) => <Habit setReload={setReload} key={item.id} habit={item}></Habit>)}
                </CriarHabito>
            </Content>

            <Footer/>
          
        </>


    )
}



function Weekday({ idx, dia, setDays, days }) {

    const [selected, setSelected] = useState("white");

    function handleClick(day) {


        if (!days.includes(day)) {
            setDays([...days, day]);
            setSelected("#52B6FF");
        }
        else if (days.includes(day)) {
            const newArray = days.filter((i) => i !== day);
            setDays([...newArray]);
            setSelected("white");
        }
    }


    return (
        <WeekDay onClick={() => handleClick(idx)} selected={selected}>{dia}</WeekDay>
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
const Content = styled.div`
    margin-top: 71px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #EBEBEB;
`
const CriarHabito = styled.div`
    width: 340px;
    height: 180px;
    margin: 0 auto;
    display: flex;
    flex-direction:column;
    > p {
        margin-top: 50px;
    }
`
const Header = styled.div`
    display: flex;
    width: 340px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: 30px;
    p {
        font-family: 'Lexend Deca', sans-serif;
        color: #126BA5;
        font-size: 23px;
        font-weight: 600;
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
export const WeekDays = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-start;

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
    background-color: ${props => (props.selected)};
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
     box-sizing: border-box;
     padding: 15px;
     display: flex; 
     flex-direction: column;
     justify-content: center;
     width: 340px;
     background-color: white;
     border-radius: ;
     display: ${props => props.visibilidade};
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
         height: 35px;
         width: 84px;
         border-radius: 4.5px;
         background-color: #52B6FF;
         font-size: 16px;
         color: #fff;
         border: none;
     }
`
const Botoes = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 25px;
    p {
        font-family: 'Lexend Deca', sans-serif;
         font-size: 16px;
         color: #52B6FF;
         margin-right: 20px;
    }
`
const DefaultMessage = styled.p`
    font-size: 18px;
    color: #666;
    font-weight: 500;
`