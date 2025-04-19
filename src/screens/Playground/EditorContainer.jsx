import React, { useContext, useState } from 'react'
import CodeEditor from './CodeEditor'
import styled from 'styled-components'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import { ModalContext } from '../../context/ModalContext'
import Select from 'react-select'
import { languageMap } from '../../context/PlaygroundContext'

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  max-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  background: #f5f5f5;
  overflow: hidden;
`

const UpperToolBar = styled.div`
  background: linear-gradient(135deg, #fdfdfd, #e4e4e4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);

  @media (max-width: 540px) {
    height: auto;
    flex-direction: column;
    align-items: flex-start;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 540px) {
    width: 100%;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.3rem;
  color: #333;

  h3 {
    margin: 0;
  }

  svg {
    cursor: pointer;
    color: #0097d7;
    transition: 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`

const SelectBars = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  & > div {
    width: 8.5rem;
  }

  & > div:last-child {
    width: 10rem;
  }
`

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: #0097d7;
  border: none;
  border-radius: 32px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #007bb8;
  }
`

const CodeEditorContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 1rem;

  & > div {
    min-height: 100%;
  }
`

const LowerToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background: #fff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.05);

  input {
    display: none;
  }

  label, a, button {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #333;
    cursor: pointer;
  }

  button:first-child {
    background: none;
    border: none;
  }

  button:last-child {
    font-weight: 500;
  }
`

const SaveAndRunButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #00b386;
  color: #fff;
  border: none;
  border-radius: 32px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #009e76;
  }
`

const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) => {
  const { openModal } = useContext(ModalContext)

  const themeOptions = [
    { value: 'githubDark', label: 'githubDark' },
    { value: 'githubLight', label: 'githubLight' },
    { value: 'bespin', label: 'bespin' },
    { value: 'duotoneDark', label: 'duotoneDark' },
    { value: 'duotoneLight', label: 'duotoneLight' },
    { value: 'dracula', label: 'dracula' },
    { value: 'xcodeDark', label: 'xcodeDark' },
    { value: 'xcodeLight', label: 'xcodeLight' },
    { value: 'vscodeDark', label: 'vscodeDark' },
    { value: 'vscodeLight', label: 'vscodeLight' },
    { value: 'okaidia', label: 'okaidia' },
  ]

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ]

  const [currentTheme, setCurrentTheme] = useState({ value: 'githubDark', label: 'githubDark' })
  const [language, setLanguage] = useState(() => {
    return languageOptions.find(lang => lang.value === currentLanguage) || languageOptions[0]
  })

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption)
  }

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
    setCurrentLanguage(selectedOption.value)
    setCurrentCode(languageMap[selectedOption.value].defaultCode)
  }

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
      {!isFullScreen && (
        <UpperToolBar>
          <Header>
            <Title>
              <h3>{title}</h3>
              <BiEditAlt onClick={() =>
                openModal({
                  show: true,
                  modalType: 5,
                  identifiers: { folderId, cardId: playgroundId }
                })
              } />
            </Title>
            <Button onClick={saveCode}>Save Code</Button>
          </Header>
          <SelectBars>
            <Select options={languageOptions} value={language} onChange={handleLanguageChange} />
            <Select options={themeOptions} value={currentTheme} onChange={handleThemeChange} />
          </SelectBars>
        </UpperToolBar>
      )}

      <CodeEditorContainer>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>

      <LowerToolBar>
        <button onClick={() => setIsFullScreen(prev => !prev)}>
          <BiFullscreen /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
        </button>

        <label htmlFor="codefile">
          <input type="file" accept="." id="codefile" onChange={(e) => getFile(e, setCurrentCode)} />
          <BiImport /> Import Code
        </label>

        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`} download="code.txt">
          <BiExport /> Export Code
        </a>

        <SaveAndRunButton onClick={runCode}>Run Code</SaveAndRunButton>
      </LowerToolBar>
    </StyledEditorContainer>
  )
}

export default EditorContainer
