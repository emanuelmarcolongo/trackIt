import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../Assets/imgs/Group8.png"
import axios from "axios"
import { LoginForm } from "../../Constants/StyledComponents"
import { ThreeDots } from "react-loader-spinner"
import { PageContainer } from "../SignInPage/SignInStyles"
import { url } from "../../Constants/urls"

export default function SignUpPage () {
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate();
    const [form ,setForm] = useState({ email: "", name: "", image: "", password: "" }); 

    function register (e) {
        setDisable(true)
        e.preventDefault();
        axios.post(`${url}/auth/sign-up`, form)
        .then(res => {navigate ("/")})
        .catch(err => {
            alert(err.response.data.message);
            setDisable(false);
        })
    }


    function handleForm (e) {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
          });
    }

    return (
        <PageContainer>
        <img src={logo} alt="Trackt Logo"/>

        <LoginForm onSubmit={register}>
            <input required disabled={disable} data-identifier="input-email" onChange={handleForm} type="email" name="email" placeholder="email"></input>
            <input required disabled={disable} data-identifier="input-password" onChange={handleForm} type="password" name="password" placeholder="senha"></input>
            <input required disabled={disable} data-identifier="input-name" onChange={handleForm} type="text" name="name" placeholder="nome"></input>
            <input required disabled={disable} data-identifier="input-photo" onChange={handleForm} type="text" name="image" placeholder="coloque a URL de uma imagem"></input>
            <button type="submit" >{disable ? 
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
            : "Cadastrar"}</button>
        </LoginForm>

        <Link data-identifier="back-to-login-action" to="/"><p>Já tem uma conta? Faça login!</p></Link>
        
    </PageContainer>
    )
}