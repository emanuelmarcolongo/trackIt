import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "./Assets/Group8.png"
import { LoginForm } from "./Constants/StyledComponents";
import { UserContext } from "./userContext";
import { ThreeDots } from 'react-loader-spinner'


export default function LoginPage({body}) {
    const navigate = useNavigate();


    const {userInfo, setUserInfo} = useContext(UserContext)
   
    const [disable, setDisable] = useState(false)

    function handleClick (e) {
    setDisable(true);
    e.preventDefault();

    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
    .then (res => {
        setUserInfo(res.data);
        navigate("/habitos")
    })
    .catch(err => {
        alert(err.response.data.message)
        setDisable(false);
    })
    }

    
    return (
        <LoginContainer>
            <img src={logo} alt="Trackt Logo"/>
            <LoginForm onSubmit={handleClick}>
                <input required disabled={disable} data-identifier="input-email" type="email" onChange={e => body.email = e.target.value}     name="e-mail" placeholder="email"></input>
                <input required disabled={disable} type="password" data-identifier="input-password" onChange={e => body.password = e.target.value}     name="password" placeholder="senha"></input>
                <button data-identifier="login-btn" disabled={disable} type="submit" >{disable 
                ?
                <ThreeDots 
                height="30" 
                width="80" 
                radius="9"
                color="white" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                 />
                  :
                  "Entrar"}</button>
                
               
            </LoginForm>

            <Link data-identifier="sign-up-action" to="/cadastro">  <p>Não tem uma conta? Cadastre-se</p></Link>
          
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
    a {
        text-decoration: none;
    }
`
