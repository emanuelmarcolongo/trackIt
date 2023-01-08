import { Link } from "react-router-dom"
import styled from "styled-components"
import {CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer({ valor }) {
    return (
        <FooTer>
            <Link data-identifier="habit-page-action" to="/habitos"><p>Hábitos</p></Link>

            <ProgressBarContainer>
                <Link to="/hoje">
                    <ProgressBarOutline>
                    <ProgressBarSize >
                        <CircularProgressbar 
                        value={valor} 
                        text="Hoje" 
                        background="true"   
                        styles={{
                            // Customize the root svg element
                            root: {},
                            // Customize the path, i.e. the "completed progress"
                            path: {
                              // Path color
                              stroke: `white`,
                              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                              strokeLinecap: 'round',
                              // Customize transition animation
                              transition: 'stroke-dashoffset 0.5s ease 0s',
                              // Rotate the path
                              transform: 'rotate(0.25turn)',
                              transformOrigin: 'center center',
                            },
                            // Customize the circle behind the path, i.e. the "total progress"
                            trail: {
                              // Trail color
                              stroke: '#52B6FF',
                              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                              strokeLinecap: 'butt',
                              // Rotate the trail
                              transform: 'rotate(0.25turn)',
                              transformOrigin: 'center center',
                            },
                            // Customize the text
                            text: {
                              // Text color
                              fill: 'white',
                              // Text size
                              fontSize: '20px',
                              fontWeight: '700',
                              fontFamily: 'Lexend Deca'
                            },
                            // Customize background - only used when the `background` prop is true
                            background: {
                              fill: '#52B6FF'
                            },
                          }}
                        />
                    </ProgressBarSize>
                    </ProgressBarOutline>
                </Link>
            </ProgressBarContainer>

            <Link data-identifier="historic-page-action" to="/historico"> <p>Histórico</p></Link>

        </FooTer>
    )
}


const FooTer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0; 
    left: 0;
    background-color: white;
    font-size: 18px;
    font-weight: 500;
    a { 
        text-decoration: none;
        color: #52B6FF;
    }
`
const ProgressBarContainer = styled.div`
font-family: 'Lexend Deca', sans-serif;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
`
const ProgressBarSize = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 91px;
    height: 91px;
    border-radius: 50%;
    > {
        font-family: 'Lexend Deca', sans-serif;
    }
`
const ProgressBarOutline = styled.div`
    width: 102px;
    height: 102px;
    border-radius: 50%;
    background-color: #52B6FF;
    display: flex;
    align-items: center;
    justify-content: center;
`