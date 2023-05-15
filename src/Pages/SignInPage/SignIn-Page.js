import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/imgs/Group8.png";
import { LoginForm } from "../../Constants/StyledComponents";
import { UserContext } from "../../Constants/userContext";
import { ThreeDots } from "react-loader-spinner";
import { url } from "../../Constants/urls";
import { PageContainer } from "./SignInStyles";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        email: '',
        password: ''
    }
  });

  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  if (localStorage.getItem("userInfo") !== null) {
    setUserInfo(localStorage.getItem("userInfo"));
    navigate("/hoje");
  }

  const onSubmit = (data) => {
    setDisable(true);
    axios
      .post(`${url}/auth/login`, data)
      .then((res) => {
        setUserInfo(res.data);
        delete res.data.password;
        delete res.data.email;
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/hoje");
      })
      .catch((err) => {
        alert(err.response.data.message);
        setDisable(false);
      });
  };

  return (
    <PageContainer>
      <img src={logo} alt="Trackt Logo" />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <input
          disabled={disable}
          data-identifier="input-email"
          type="email"
          {...register("email", {required: true, pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Insira um formato de e-mail válido"
          }})}
          name="email"
          placeholder="email"
        ></input>
        {errors.email?.type === 'required' && <p role="alert">Forneça um e-mail válido</p>}
        {errors.email?.message && <p role="alert">{errors.email?.message}</p>}
        <input
          disabled={disable}
          type="password"
          data-identifier="input-password"
          {...register("password", {required: true})}
          name="password"
          placeholder="senha"
        ></input>
        {errors.password?.type === 'required' && <p role="alert">Forneça uma senha</p>}
        <button data-identifier="login-btn" disabled={disable} type="submit">
          {disable ? (
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
          ) : (
            "Entrar"
          )}
        </button>
      </LoginForm>

      <Link data-identifier="sign-up-action" to="/cadastro">
        {" "}
        <p>Não tem uma conta? Cadastre-se</p>
      </Link>
    </PageContainer>
  );
}
