import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "./Assets/Group8.png"
import { LoginForm } from "./Constants/StyledComponents";
import { UserContext } from "./userContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserContext)
    const body = {email: "", password: ""}

    function handleClick (e) {
    e.preventDefault();
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
    .then (res => {
        setUserInfo(res.data);
        navigate("/habitos")
    })
    .catch(err => console.log(err))
    }

    
    return (
        <LoginContainer>
            <img src={logo} alt="Trackt Logo"/>

            <LoginForm onSubmit={handleClick}>
                <input required type="email" onChange={e => body.email = e.target.value}     name="e-mail" placeholder="email"></input>
                <input required type="password" onChange={e => body.password = e.target.value}     name="password" placeholder="senha"></input>
                <button type="submit" >Entrar</button>
            </LoginForm>

            <Link to="/cadastro">  <p>Não tem uma conta? Cadastre-se</p></Link>
          
        </LoginContainer>
    )


}



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