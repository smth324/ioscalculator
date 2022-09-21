import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import BasicButton from './components/BasicButton';
import History from './components/History';

const Container = styled.div`
    background-color: var(--background-color);
    width: 240px;
    padding: 5px;
    position: relative;
`
const ShowHistoryBtn = styled.button`
  all:unset; 
  color: white;
  cursor: pointer;
  float: right;
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
  const [history, setHistory] = useState<string[]>([])
  const [show, setShow] = useState(false)

  const handleClear = () => {
    setState('0')
    setSecondState('0')
    setDisplay('0')
    setFirst(true)
    setCurrentOperation('')
  }
  const handleEquals = useCallback((label: string) => {
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
      setHistory((history) => history.concat(`${firstFactor}+/-=${newState}`))
    } else if (label === '%') {
      newState = String(firstFactor / 100)
      setSecondState('0')
      setHistory((history) => history.concat(`${firstFactor}%=${newState}`))
    } else if (currentOperation === '×') {
      newState = String(firstFactor * secondFactor)
      setHistory((history) => history.concat(`${firstFactor}${currentOperation}${secondFactor}=${newState}`))
    } else if (currentOperation === '+') {
      newState = String(firstFactor + secondFactor)
      setHistory((history) => history.concat(`${firstFactor}${currentOperation}${secondFactor}=${newState}`))
    } else if (currentOperation === '÷') {
      newState = String(firstFactor / secondFactor)
      setHistory((history) => history.concat(`${firstFactor}${currentOperation}${secondFactor}=${newState}`))
    } else if (currentOperation === '−') {
      newState = String(firstFactor - secondFactor)
      setHistory((history) => history.concat(`${firstFactor}${currentOperation}${secondFactor}=${newState}`))
    }
    setState('')
    setFirst(true)
    setDisplay(newState)
  }, [currentOperation, display, secondState, state])
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
  }, [first])
  const handleOperationClick = useCallback((label: string) => {
    if (!(label === '=' || label === '+/-' || label === '%')) {
      setFirst(false)
      setSecondState('')
      setState(display)
      setCurrentOperation(label)
    }
  }, [display])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isNaN(Number(event.key))) {
        handleNumberClick(event.key)
        return
      }
      if (event.key === '+') {
        handleOperationClick('+')
      }
      if (event.key === '/') {
        handleOperationClick('÷')
      }
      if (event.key === '-') {
        handleOperationClick('−')
      }
      if (event.key === '*') {
        handleOperationClick('×')
      }
      if (event.key === 'Enter') {
        handleEquals('=')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNumberClick, handleOperationClick, handleEquals])

  const handleHistoryClick = (answer: string) => {
    setState(answer)
    setDisplay(answer)
    setSecondState('')
    setShow(false)
    setFirst(true)
    setCurrentOperation('')
  }
  return (
    <Container>
      {show ? <History setShow={setShow} history={history} handleHistoryClick={handleHistoryClick} /> : <ShowHistoryBtn onClick={() => setShow(true)}>History</ShowHistoryBtn>}
      <Display displayLength={Number(display).toLocaleString().length}>{Number(display).toLocaleString()}</Display>
      <div>
        <BasicButton currentOperation={currentOperation} label={state === '0' ? 'AC' : 'C'} color='light' textColor='black' onClick={handleClear} />
        <BasicButton currentOperation={currentOperation} label='+/-' color='light' textColor='black' onClick={(label) => { handleOperationClick(label); handleEquals(label) }} />
        <BasicButton currentOperation={currentOperation} label='%' color='light' textColor='black' onClick={(label) => { handleOperationClick(label); handleEquals(label) }} />
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
