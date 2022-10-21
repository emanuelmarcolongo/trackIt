import axios from "axios"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import trash from "./Assets/trash.png"
import { UserContext } from "./userContext";

export default function Habit({habit, setReload}) {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate= useNavigate();
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [selected, setSelected] = useState("red");


    function handleDelete (i) {
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}`, { headers: { Authorization: `Bearer ${userInfo.token}` }})
        .then(res => setReload([]))
        .catch(err => alert(err.response.data))

        setReload("123")
    }

    

    return (
        <Habitt>
            <p>{habit.name}</p>
            <WeekDays>
                {weekdays.map((i, idx) => <Weekday days={habit.days} dia={i} key={idx} idx={idx}/>)}
            </WeekDays>

            <img onClick={() => handleDelete(habit.id)} src={trash} alt="Delete"/>
        </Habitt>
    )
}

    function Weekday ({dia, idx, days}) {

        const [selected, setSelected] = useState("white");


        return (
            <WeekDay selected={selected}>
                {dia}
            </WeekDay>
        )
    }

const Habitt = styled.div`
    width: 340px;
    height: 91px;
    position: relative;
    border: 1px solid #CFCFCF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    padding: 5px;
    background-color: white;
    border-radius: 5px;
    
    p {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        color: #666666;
        margin-bottom: 10px;
        margin-left: 15px;
    }
    img {
        position: absolute;
        top: 10px;
        right: 10px;
                margin-left: 15px;
    }
`
const WeekDays = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 15px;
`
const WeekDay = styled.li`
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
