import styled from "styled-components";
import Footer from "./Footer";
import NavBar from "./Navbar";


export default function HistoryPage() {
    return (
        <>

            <NavBar />
            <Header>
                <p> Histórico</p>
                <>Em breve você poderá ver o histórico dos seus hábitos aqui!</>
            </Header>

            <Footer />
        </>
    )
}

const Header = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    align-items: flex-start;
    margin-bottom: 15px;
    background-color: white;
    height: 100vh;
    padding-left: 30px;
    font-size: 18px;
    color: #666666;
    p {
        margin-top: 100px;
        margin-bottom: 20px;
        color: #126BA5;
        font-size: 23px;
        font-weight: 600;
    }
`