import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "./Assets/TrackIt.png"
import { useContext} from "react"
import { UserContext } from "./userContext"



export default function NavBar() {

    const { userInfo, setUserInfo } = useContext(UserContext);

    return (
        <Navbar>
            <Link to="/">
                <img src={logo} alt="TrackIt Logo" />
            </Link>

            <UserImg  data-identifier="avatar" src={userInfo.image} alt="Imagem do Usuário" />
        </Navbar>
    )
}


const Navbar = styled.div`

    background-color: #126BA5;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0; 
    left: 0;
    z-index: 10;
`

const UserImg = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
`