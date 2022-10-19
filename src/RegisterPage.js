import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "./Assets/Group8.png"
import axios from "axios"
import { LoginForm } from "./Constants/StyledComponents"

export default function RegisterPage () {

    const body = {email: "", name: "", image: "", password: ""}
    const navigate = useNavigate();

    function register (e) {
        e.preventDefault();
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
        .then(res => {navigate ("/")})
        .catch(err => alert(err.response.data.message))
    }


    return (
        <LoginContainer>
        <img src={logo} alt="Trackt Logo"/>

        <LoginForm onSubmit={register}>
            <input required onChange={e => body.email= e.target.value} type="email" name="e-mail" placeholder="email"></input>
            <input required onChange={e => body.password= e.target.value} type="password" name="password" placeholder="senha"></input>
            <input required onChange={e => body.name= e.target.value} type="text" name="name" placeholder="nome"></input>
            <input required onChange={e => body.image= e.target.value} type="text" name="image" placeholder="foto"></input>
            <button type="submit" >Cadastrar</button>
        </LoginForm>

        <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        
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