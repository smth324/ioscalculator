import React from 'react'
import styled from "styled-components"

interface Props {
    history: string[]
    setShow: (boolean: boolean) => void
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height:425px;
    width: 250px;
    position: absolute;
    max-height: 425px;
    overflow-y:scroll;
    top: 8px;
    left: 461px;
    background-color: black;
`
const Cell = styled.div`
    color: white; 
    padding: 20px 5px;
    text-align: right;
    background-color: black;
    border-top: 0.3px solid white;
    border-bottom: 0.3px solid white;
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

const History: React.FC<Props> = ({ history, setShow }) => {
    return (
        <Container>
            <HideHistoryBtn onClick={() => setShow(false)}>X</HideHistoryBtn>
            {history.map(x => (
                <Cell>
                    {x}
                </Cell>
            ))}
        </Container>
    )
}

export default History