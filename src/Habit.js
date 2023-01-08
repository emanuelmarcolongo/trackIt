import axios from "axios"
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import trash from "./Assets/imgs/trash.png"
import { UserContext } from "./userContext";

export default function Habit({ habit, setReload }) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const array = [];

    function handleDelete(i) {
        if (window.confirm("Tem certeza que quer excluir o hábito?") === true) {
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
                .then(res => setReload([]))
                .catch(err => alert(err.response.data))

            setReload("123")
        }

    }



    return (
        <Habitt>
            <p data-identifier="habit-name" >{habit.name}</p>
            <WeekDays>
                {weekdays.map((i, idx) => <Weekday array={array} days={habit.days} dia={i} key={idx} idx={idx} />)}
            </WeekDays>

            <img data-identifier="delete-habit-btn" onClick={() => handleDelete(habit.id)} src={trash} alt="Delete" />
        </Habitt>
    )
}

function Weekday({ dia, idx, days, array }) {

    const [selected, setSelected] = useState(false)
    useEffect(() => {
        for (let i = 0; i < days.length; i++) {
            if (days[i] === idx) {
                setSelected(true)
            }
        }
    }, [])


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
    align-items: center;
    margin-top: 20px;
    padding: 5px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid black;
    
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
    border: 2px solid ${props => props.selected ? "white" : "#DBDBDB"};
    background-color: ${props => props.selected ? "#52B6FF" : "white"};
    border-radius: 5px;
    color: ${props => props.selected ? "white" : "#DBDBDB"};
`
