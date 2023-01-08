import { useState } from "react";
import styled from "styled-components";


export function Weekday({  idx, dia, setDays, days }) {
    const [selected, setSelected] = useState("white");
  
    function handleClick(day) {
      if (!days.includes(day)) {
        setDays([...days, day]);
        setSelected("#52B6FF");
      } else if (days.includes(day)) {
        const newArray = days.filter((i) => i !== day);
        setDays([...newArray]);
        setSelected("white");
      }
    }
  
    return (
      <WeekdayItem onClick={() => handleClick(idx)} selected={selected}>
        {dia}
      </WeekdayItem>
    );
  }

  export const WeekdayItem = styled.li`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  font-size: 20px;
  color: #dbdbdb;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  background-color: ${(props) => props.selected};
`;