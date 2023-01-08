import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../../Assets/imgs/Group8.png"
import { LoginForm } from "../../Constants/StyledComponents";
import { UserContext } from "../../userContext";
import { ThreeDots } from 'react-loader-spinner'


export default function SignInPage() {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [disable, setDisable] = useState(false);
    const body = {email: "", password: ""};

    if(localStorage.getItem('userInfo') !== null) {
        setUserInfo(localStorage.getItem('userInfo'));
        navigate("/hoje");
    }

    function handleClick (e) {
    setDisable(true);
    e.preventDefault();

    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
    .then (res => {
        setUserInfo(res.data);
        delete res.data.password;
        delete res.data.email;
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate("/hoje")
    })
    .catch(err => {
        alert(err.response.data.message)
        setDisable(false);
    })
    }

    
    return (
        <PageContainer>
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
          
        </PageContainer>
    )
}




const PageContainer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
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
    button {
        cursor: pointer;
    }
`