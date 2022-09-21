import React from 'react'
import styled from "styled-components"

interface Props {
    history: string[]
    setShow: (boolean: boolean) => void
    handleHistoryClick: (answer: string) => void
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height:425px;
    width: 250px;
    position: absolute;
    max-height: 425px;
    overflow-y:scroll;
    top: 0px;
    left: 0px;
    background-color: black;
`
const Cell = styled.div`
    color: white; 
    padding: 20px 5px;
    text-align: right;
    background-color: black;
    border-bottom: 0.6px solid white;
    cursor: pointer;
`

const HideHistoryBtn = styled.button`
    width: 230px;
    all: unset;
    cursor:pointer;
    color: white;
    background-color: black;
    text-align: center;
    position: fixed;
`

const History: React.FC<Props> = ({ history, setShow, handleHistoryClick }) => {
    const handleClick = (answer: string) => {
        handleHistoryClick(answer.split('=')[1])
    }
    return (
        <Container>
            <HideHistoryBtn onClick={() => setShow(false)}>X</HideHistoryBtn>
            {[...history].reverse().map((x, i) => (
                <Cell onClick={() => handleClick(x)} key={x + i}>
                    {x}
                </Cell>
            ))}
        </Container>
    )
}

export default History