import styled from "styled-components"

export const PageContainer = styled.div`
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