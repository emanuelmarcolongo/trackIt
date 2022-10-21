import { Link } from "react-router-dom"
import styled from "styled-components"


export default function Footer() {
    return (
        <FooTer>
            <Link to="/habitos"><p>Hábitos</p></Link>

            <Ellipse><Link to="/hoje">Hoje</Link></Ellipse>

            <Link to="/historico"> <p>Histórico</p></Link>
           
        </FooTer>
    )
}


const FooTer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0; 
    left: 0;
    background-color: white;
    font-size: 18px;
    font-weight: 500;
    a { 
        text-decoration: none;
        color: #52B6FF;
    }
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
    font-weight: 500;
    a {
        color: white;
    }
`
