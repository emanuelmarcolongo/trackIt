import styled from "styled-components"
import trash from "./Assets/trash.png"

export default function Habit({habit}) {
    return (
        <Habitt>
            <p>{habit.name}</p>
            <WeekDays>
                <WeekDay>D</WeekDay>
                <WeekDay>S</WeekDay>
                <WeekDay>T</WeekDay>
                <WeekDay>Q</WeekDay>
                <WeekDay>Q</WeekDay>
                <WeekDay>S</WeekDay>
                <WeekDay>S</WeekDay>
            </WeekDays>

            <img src={trash} alt="Delete"/>
        </Habitt>
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
    
    :nth-child(2n) {
        background-color: #CFCFCF;
        color: white;
    }
`
