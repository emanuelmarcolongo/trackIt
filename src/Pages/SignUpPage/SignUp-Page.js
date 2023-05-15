import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/imgs/Group8.png";
import axios from "axios";
import { LoginForm } from "../../Constants/StyledComponents";
import { ThreeDots } from "react-loader-spinner";
import { PageContainer } from "../SignInPage/SignInStyles";
import { url } from "../../Constants/urls";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      image: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    setDisable(true);
    axios
      .post(`${url}/auth/sign-up`, formData)
      .then((res) => {
        navigate("/");
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
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Insira um formato de e-mail válido",
            },
          })}
          type="email"
          name="email"
          placeholder="email"
        ></input>
        {errors.email?.type === "required" && (
          <p role="alert">Forneça um e-mail válido</p>
        )}
        {errors.email?.message && <p role="alert">{errors.email?.message}</p>}

        <input
          disabled={disable}
          data-identifier="input-password"
          {...register("password", { required: true, minLength: {
            value: 6,
            message: 'A senha deve conter ao menos 6 caracteres'
          } })}
          type="password"
          name="password"
          placeholder="senha"
        ></input>
        {errors.password?.type === "required" && (
          <p role="alert">Forneça uma senha</p>
        )}
        {errors.password?.message && <p role="alert">{errors.password?.message}</p>}
        <input
          disabled={disable}
          data-identifier="input-name"
          {...register("name", { required: true })}
          type="text"
          name="name"
          placeholder="nome"
        ></input>
        {errors.name?.type === "required" && <p role="alert">Forneça nome</p>}
        <input
          disabled={disable}
          data-identifier="input-photo"
          {...register("image", { required: true,
        pattern: {
            value: /^((http|https):\/\/)/,
            message: 'Insira um formato válido de URL (https://...)'
        } })}
          type="text"
          name="image"
          placeholder="coloque a URL de uma imagem"
        ></input>
        {errors.image?.type === "required" && (
          <p role="alert">Forneça a url da imagem</p>
        )}
        {errors.image?.message && <p role="alert">{errors.image?.message}</p>}

        <button type="submit">
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
            "Cadastrar"
          )}
        </button>
      </LoginForm>

      <Link data-identifier="back-to-login-action" to="/">
        <p>Já tem uma conta? Faça login!</p>
      </Link>
    </PageContainer>
  );
}
