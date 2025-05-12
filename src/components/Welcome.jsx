import React from "react";
import styled from "styled-components";
import CutieHello from "../assets/cutieHello.gif";

const Welcome = ({ currentUser }) => {
  return (
    <>
      <Container>
        <img src={CutieHello} alt="cutieHello" />
        <h1>
          Welcome, <span>{currentUser?.username || "User"}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    height: 15rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
