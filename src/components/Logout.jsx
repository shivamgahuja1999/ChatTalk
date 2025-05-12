import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <Button onClick={handleClick}>
        <BiPowerOff />
      </Button>
    </div>
  );
};
const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
background-color: #9a86f3;
padding: 0.5rem;
border-radius: 0.5rem;
cursor: pointer;
border: none;
svg{
    font-size: 1.3rem;
    color: #ebe7ff;
}
`;
export default Logout;
