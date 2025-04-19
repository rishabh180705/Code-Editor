import React from 'react'
import styled from 'styled-components'
import { BiImport } from 'react-icons/bi'


export const Header = styled.div`
  background: #ededed;
  height: 4rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
  padding: 0 1rem;
  z-index: 2;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input{
    display: none;
  }
  label, a{
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: black;
  }
`



export const Console = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 300px; /* Adjust height as needed */
  overflow: hidden;
  border-top: 1px solid #ccc;
`

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: 0;
  outline: 0;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
  line-height: 1.5;
  font-family: monospace;
  white-space: pre-wrap;
`

const InputConsole = ({ currentInput, setCurrentInput, getFile }) => {
  return (
    <Console>
      <Header>
        Input: 
        <label htmlFor="inputfile">
          <input type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentInput)} /> <BiImport /> Import Input
        </label>
      </Header>
      <TextArea
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
      />
    </Console>
  )
}

export default InputConsole