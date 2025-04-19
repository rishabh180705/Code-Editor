import React, { useContext } from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logo-small.png'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { useNavigate } from 'react-router-dom'

const StyledRightComponent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    padding: 2rem;
    background-color: #f4f7fa;
    min-height: 100vh;
    overflow-y: auto;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
        padding: 1.5rem 1rem;
    }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 2px solid #ddd;
  margin-bottom: 1rem;
`

const Heading = styled.h3`
  font-size: ${props => props.size === 'small' ? "1.25rem" : "1.75rem"};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #2193b0;
  }
`

const AddButton = styled.div`
    font-size: 1rem;
    border-radius: 30px;
    color: #fff;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, #6dd5ed, #2193b0);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    box-shadow: 0 4px 15px rgba(33,147,176,0.3);
    transition: 0.3s ease-in-out;

    span {
        font-size: 1.5rem;
        font-weight: 700;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
        background: linear-gradient(135deg, #2193b0, #6dd5ed);
    }
`

const FolderCard = styled.div`
    margin-bottom: 2rem;
`

const FolderIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #555;

    svg {
      font-size: 1.25rem;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      &:hover {
        color: #2193b0;
        transform: scale(1.2);
      }
    }
`

const PlayGroundCards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 428px){
        grid-template-columns: 1fr;
    }    
`

const Card = styled.div`
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 10px 28px rgba(0,0,0,0.1);
    }
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`

const CardContent = styled.div`
  p {
    margin: 0;
    font-weight: 500;
    color: #222;
    &:nth-child(2) {
      font-size: 0.9rem;
      color: #666;
    }
  }
`

const Logo = styled.img`
    width: 60px;
    margin-right: 1rem;

    @media (max-width: 425px){
        width: 50px;
        margin-right: 0.5rem;
    }
`

const RightComponent = () => {
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <StyledRightComponent>
      <Header>
        <Heading size="large">
          My <span>Playground</span>
        </Heading>
        <AddButton onClick={() => openModal({
          show: true,
          modalType: 1,
          identifiers: { folderId: "", cardId: "" }
        })}><span>+</span> New Folder</AddButton>
      </Header>

      {Object.entries(folders).map(([folderId, folder]) => (
        <FolderCard key={folderId}>
          <Header>
            <Heading size="small">
              <FcOpenedFolder /> {folder.title}
            </Heading>
            <FolderIcons>
              <IoTrashOutline onClick={() => deleteFolder(folderId)} />
              <BiEditAlt onClick={() => openModal({
                show: true,
                modalType: 4,
                identifiers: { folderId, cardId: "" }
              })} />
              <AddButton onClick={() => openModal({
                show: true,
                modalType: 2,
                identifiers: { folderId, cardId: "" }
              })}><span>+</span> Playground</AddButton>
            </FolderIcons>
          </Header>

          <PlayGroundCards>
            {Object.entries(folder.playgrounds).map(([playgroundId, playground]) => (
              <Card key={playgroundId} onClick={() => navigate(`/playground/${folderId}/${playgroundId}`)}>
                <CardContainer>
                  <Logo src={logo} />
                  <CardContent>
                    <p>{playground.title}</p>
                    <p>Language: {playground.language}</p>
                  </CardContent>
                </CardContainer>
                <FolderIcons onClick={(e) => e.stopPropagation()}>
                  <IoTrashOutline onClick={() => deleteCard(folderId, playgroundId)} />
                  <BiEditAlt onClick={() => openModal({
                    show: true,
                    modalType: 5,
                    identifiers: { folderId, cardId: playgroundId }
                  })} />
                </FolderIcons>
              </Card>
            ))}
          </PlayGroundCards>
        </FolderCard>
      ))}
    </StyledRightComponent>
  )
}

export default RightComponent
