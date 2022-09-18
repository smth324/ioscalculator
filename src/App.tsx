import React, { useState, useEffect, useCallback } from 'react';
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
  const [state, setState] = useState('')
  const [secondState, setSecondState] = useState('')
  const [currentOperation, setCurrentOperation] = useState('')
  const [display, setDisplay] = useState('0')
  const [first, setFirst] = useState(true)


  const handleClear = () => {
    setState('0')
    setSecondState('0')
    setDisplay('0')
    setFirst(true)
    setCurrentOperation('')
  }
  const handleEquals = (label: string) => {
    let secondFactor = Number(secondState)
    let firstFactor = Number(state)
    if (secondState === '') {
      setSecondState(state)
      secondFactor = Number(state)
    }
    if (state === '') {
      firstFactor = Number(display)
    }
    let newState = state
    if (label === '+/-') {
      newState = String(0 - firstFactor)
    } else if (label === '%') {
      newState = String(firstFactor / 100)
      setSecondState('0')
    } else if (currentOperation === '×') {
      newState = String(firstFactor * secondFactor)
    } else if (currentOperation === '+') {
      newState = String(firstFactor + secondFactor)
    } else if (currentOperation === '÷') {
      newState = String(firstFactor / secondFactor)
    } else if (currentOperation === '−') {
      newState = String(firstFactor - secondFactor)
    }
    setState('')
    setFirst(true)
    setDisplay(newState)
  }
  const handleNumberClick = useCallback((label: string) => {
    if (!first) {
      setSecondState((state) => {
        if (state.length === 9) return state
        const toReturn = state === '0' ? label : state.concat(label)
        setDisplay(toReturn)
        return toReturn
      })
      return
    }
    setState((state) => {
      if (state.length === 9) return state
      const toReturn = state.concat(label)
      setDisplay(toReturn)
      return toReturn
    })
  },[first])
  const handleOperationClick = (label: string) => {
    if (label !== '=') {
      setFirst(false)
      setSecondState('')
      setState(display)
      setCurrentOperation(label)
    }
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('press')
      if (!isNaN(Number(event.key))) {
        handleNumberClick(event.key)
      }
    }
    console.log('asd')
    document.body.addEventListener('keydown', (event) => handleKeyDown(event))
    return function cleanup() {
      console.log('clean')
      document.body.removeEventListener('keydown', (event) => handleKeyDown(event))
    }
  },[handleNumberClick])
  return (
    <Container>
      <Display displayLength={display.length}>{Number(display).toLocaleString()}</Display>
      <div>
        <BasicButton currentOperation={currentOperation} label={state === '0' ? 'AC' : 'C'} color='light' textColor='black' onClick={handleClear} />
        <BasicButton currentOperation={currentOperation} label='+/-' color='light' textColor='black' onClick={(label) => {
          handleOperationClick(label)
          handleEquals(label)
        }} />
        <BasicButton currentOperation={currentOperation} label='%' color='light' textColor='black' onClick={(label) => {
          handleOperationClick(label)
          handleEquals(label)
        }} />
        <BasicButton currentOperation={currentOperation} label='÷' color='highlight' onClick={handleOperationClick} />

        <BasicButton currentOperation={currentOperation} label='7' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='8' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='9' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='×' color='highlight' onClick={handleOperationClick} />

        <BasicButton currentOperation={currentOperation} label='4' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='5' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='6' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='−' color='highlight' onClick={handleOperationClick} />

        <BasicButton currentOperation={currentOperation} label='1' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='2' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='3' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='+' color='highlight' onClick={handleOperationClick} />

        <BasicButton currentOperation={currentOperation} label='0' color='black' onClick={handleNumberClick} length='medium' />
        <BasicButton currentOperation={currentOperation} label='.' color='black' onClick={handleNumberClick} />
        <BasicButton currentOperation={currentOperation} label='=' color='highlight' onClick={handleEquals} />
      </div>
    </Container>
  )
}

export default App;
