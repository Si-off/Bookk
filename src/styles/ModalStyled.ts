import styled, { keyframes } from "styled-components";
import { pixelToRem, getStyledColor } from "utils";
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const WrapperModal = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 / 71%);
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 100%;

  @media screen and (max-height: 768px) {
    align-items: unset;
    padding-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Presentation = styled.div`
  z-index: 1200;
  position: absolute;
`;

export const ModalClose = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: white;
`;

export const Modal = styled.div`
  position: relative;
  min-width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} 400ms;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }

  @media screen and (max-width: 768px) {
    overflow-y: scroll !important;
  }
`;
export const ModalPosterContainer = styled.div`
  background-color: rgb(0 0 0 / 71%);
  position: relative;
  display: flex;
  justify-content: center;
  height: ${pixelToRem(500)};
`;
export const ModalPosterImg = styled.img`
  height: ${pixelToRem(500)};
  background-color: ${getStyledColor("cool_gray", 400)};
  object-fit: cover;
`;

export const ModalContent = styled.div`
  padding: 40px;
  color: white;
`;

export const ModalTitle = styled.h1`
  padding: 0;
  font-size: 40px;
  margin: 16px 0;
`;

export const ModalDetails = styled.div`
  font-weight: 600;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ModalOverview = styled.p`
  font-size: 20px;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
