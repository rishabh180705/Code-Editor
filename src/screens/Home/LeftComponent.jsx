import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { ModalContext } from '../../context/ModalContext'

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    z-index: 1;

    @media (max-width: 768px) {
        position: relative;
        width: 100%;
        height: auto;
        padding: 3rem 1rem;
    }
`

const ContentContainer = styled.div`
    text-align: center;
    color: #fff;
`

const Logo = styled.img`
    width: 150px;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1));
`

const MainHeading = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;

    span {
        background: linear-gradient(90deg, #6dd5ed, #2193b0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

const SubHeading = styled.div`
    font-size: 1.3rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
`

const AddNewButton = styled.button`
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    transition: all 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;

    span {
        font-size: 1.8rem;
        font-weight: bold;
    }

    &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
`

const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <StyledLeftComponent>
            <ContentContainer>
                <Logo src={logo} alt="Logo" />
                <MainHeading><span>Code</span> Editor</MainHeading>
                <SubHeading>Code. Compile. Debug.</SubHeading>
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })}>
                    <span>+</span> Create New Playground
                </AddNewButton>
            </ContentContainer>
        </StyledLeftComponent>
    )
}

export default LeftComponent
