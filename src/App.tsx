import React, { useState } from 'react';
import styled from 'styled-components';
import BasicButton from './components/BasicButton';

const Container = styled.div`
    background-color: var(--background-color);
    width: 240px;
    padding: 5px;
`

const Display = styled.div`
  width: 100%;
  margin-top: 50px;
  font-size: 50px;
  color: white;
  text-align: end;
`

const App = () => {
  const [state, setState] = useState('0')
  return (
    <Container>
      <Display>{state}</Display>
      <div>
        <BasicButton display={setState} label={state === '0' ? 'AC' : 'C'} color='light' textColor='black' onClick={() => setState('0')} />
        <BasicButton display={setState} label='+/-' color='light' textColor='black' />
        <BasicButton display={setState} label='%' color='light' textColor='black' />
        <BasicButton display={setState} label='÷' color='highlight' />

        <BasicButton display={setState} label='7' color='black' />
        <BasicButton display={setState} label='8' color='black' />
        <BasicButton display={setState} label='9' color='black' />
        <BasicButton display={setState} label='×' color='highlight' />

        <BasicButton display={setState} label='4' color='black' />
        <BasicButton display={setState} label='5' color='black' />
        <BasicButton display={setState} label='6' color='black' />
        <BasicButton display={setState} label='−' color='highlight' />

        <BasicButton display={setState} label='1' color='black' />
        <BasicButton display={setState} label='2' color='black' />
        <BasicButton display={setState} label='3' color='black' />
        <BasicButton display={setState} label='+' color='highlight' />

        <BasicButton display={setState} label='0' color='black' length='medium' />
        <BasicButton display={setState} label='.' color='black' />
        <BasicButton display={setState} label='=' color='highlight' />
      </div>
    </Container>
  )
}

export default App;
