import styled from "styled-components";
import Footer from "./Footer";
import NavBar from "./Navbar";


export default function HistoryPage () {
    return (
        <>

            <NavBar/>
            <Header>
                    <p> Histórico</p>
                    <>Em breve você poderá ver o histórico dos seus hábitos aqui!</>
                </Header>
            
            <Footer/>
        </>
    )
}

const Header = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    display: flex;
    flex-direction: column;
    width: 340px;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: 100px;
    p {
        
        color: #126BA5;
        font-size: 23px;
        font-weight: 600;
        margin-bottom: 50px;
    }
`