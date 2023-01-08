import styled from "styled-components";
import Footer from "../../Components/Footer.js";
import NavBar from "../../Components/Navbar";


export default function HistoryPage({valor}) {
  return (
    <>
      <NavBar />
      <Header>
        <p> Histórico</p>
        <>Em breve você poderá ver o histórico dos seus hábitos aqui!</>
      </Header>

      <Footer valor={valor}/>
    </>
  );
}



const Header = styled.div`
  font-family: "Lexend Deca", sans-serif;
  color: #666666;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
  text-align: justify;
  margin-bottom: 15px;
  background-color: #EBEBEB;
  height: 100vh;
  padding-left: 30px;
  font-size: 18px;
  color: #666666;
  p {
    text-align: justify;
    margin-top: 100px;
    margin-bottom: 20px;
    color: #126ba5;
    font-size: 23px;
    font-weight: 600;
  }
`;
