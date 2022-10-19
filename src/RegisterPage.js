import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "./Assets/Group8.png"

export default function RegisterPage () {
    return (
        <LoginContainer>
        <img src={logo} alt="Trackt Logo"/>

        <LoginForm>
            <input required type="email" name="e-mail" placeholder="email"></input>
            <input required type="text" name="password" placeholder="senha"></input>
            <input required type="text" name="name" placeholder="nome"></input>
            <input required type="text" name="image" placeholder="foto"></input>
            <button type="submit" >Cadastrar</button>
        </LoginForm>
        
        <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        
    </LoginContainer>
    )
}

const LoginForm = styled.form`
     font-family: 'Lexend Deca', sans-serif;
     display: flex; 
     flex-direction: column;
     justify-content: center;
     width: 303px;
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

const LoginContainer = styled.div`
    width: 375px;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 180px;
        height: 180px;
    }
    p {
        color: #52B6FF;
        font-weight: 400;
        font-size: 14px;
        margin-top: 25px;
    }

`