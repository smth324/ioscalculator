import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BasicButton from './components/BasicButton';

const Container = styled.div`
    background-color: var(--background-color);
    width: 240px;
    padding: 5px;
`

interface styledProps {
  displayLength: number
}

const Display = styled.div<styledProps>`
  width: 100%;
  margin-top: 50px;
  height: 65px;
  text-align: end;
  text-align: ${props => props.displayLength > 7 && 'center'};
  font-size: ${props => {
    if (props.displayLength < 6) return '65px'
    return `${65 - ((props.displayLength - 5) * 6)}px`
  }};
  color: white;
`

const App = () => {
  const [state, setState] = useState('0')
  const [secondState, setSecondState] = useState('0')
  const [currentOperation, setCurrentOperation] = useState('')

  useEffect(() => {
    document.body.addEventListener('keydown', (event) => console.log(event.code))

    return function cleanup() {
      window.removeEventListener('keydown', (event) => console.log(event.code))
    }
  }, [])
  const handleEquals = () => {
    if (currentOperation === '×') {
      setState(String(Number(state) * Number(secondState)))
      setSecondState('0')
      return
    }
    if (currentOperation === '+') {
      setState(String(Number(state) + Number(secondState)))
      setSecondState('0')
      return
    }
    if (currentOperation === '÷') {
      setState(String(Number(state) / Number(secondState)))
      setSecondState('0')
      return
    }
    if (currentOperation === '−') {
      setState(String(Number(state) - Number(secondState)))
      setSecondState('0')
      return
    }
  }
  return (
    <Container>
      <Display displayLength={secondState === '0' ? state.length : secondState.length}>{Number(secondState === "0" ? state : secondState).toLocaleString()}</Display>
      <div>
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label={state === '0' ? 'AC' : 'C'} color='light' textColor='black' onClick={() => setState('0')} />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='+/-' color='light' textColor='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='%' color='light' textColor='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='÷' color='highlight' />

        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='7' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='8' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='9' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='×' color='highlight' />

        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='4' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='5' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='6' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='−' color='highlight' />

        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='1' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='2' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='3' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='+' color='highlight' />

        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='0' color='black' length='medium' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} display={setState} label='.' color='black' />
        <BasicButton setSecondState={setSecondState} currentOperation={currentOperation} setCurrentOperation={setCurrentOperation} type="operation" display={setState} label='=' color='highlight' onClick={handleEquals} />
      </div>
    </Container>
  )
}

export default App;
