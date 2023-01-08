import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./Assets/imgs/TrackIt.png";

export default function NavBar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Navbar>
      <Link to="/">
        <img src={logo} alt="TrackIt Logo" />
      </Link>

      <UserImg
        data-identifier="avatar"
        src={userInfo.image}
        alt="Imagem do Usuário"
      />
    </Navbar>
  );
}

const Navbar = styled.div`
  background-color: #126ba5;
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
`;

const UserImg = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
`;
