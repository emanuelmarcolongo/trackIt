import styled from "styled-components";

export const LoginForm = styled.form`
  font-family: "Lexend Deca", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 303px;
  input {
    font-family: "Lexend Deca", sans-serif;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    margin-bottom: 6px;
    ::placeholder {
      font-family: "Lexend Deca", sans-serif;
      color: #dbdbdb;
      font-size: 20px;
    }
  }

  p {
    margin-bottom: 10px;
  }
  
  button {
    font-family: "Lexend Deca", sans-serif;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4.5px;
    background-color: #52b6ff;
    font-size: 21px;
    color: #fff;
    img {
      width: 40px;
      height: 40px;
      color: white;
    }
  }
`;
