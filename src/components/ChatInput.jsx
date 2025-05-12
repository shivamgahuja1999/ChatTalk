import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import styled,{ createGlobalStyle } from "styled-components";

const ChatInput = ({ handleSendMessage }) => {
  console.log("EmojiPicker:", EmojiPicker);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObj) => {
    setMsg((prevMsg) => prevMsg + emojiObj.emoji);
  };
  const sendChat=(event)=>{
    event.preventDefault();
    if(msg.length>0){
      handleSendMessage(msg);
      setMsg("");
    }
  }
  return (
    <div>
      <GlobalStyle />
      <Container>
        <div className="button-container">
          <div className="emoji">
            <FaRegFaceSmile onClick={handleEmojiPicker} />
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={(e)=>sendChat(e)}>
          <input
            type="text"
            placeholder="Enter your message here..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit" className="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </div>
  );
};
const Container = styled.div`
  display: grid;
  /* height: 20%; */
  /* width: 100%; */
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1.5rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.2rem;
        color: #c0c0c0;
        cursor: pointer;
      }
    }
  }
  .input-container {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    border-radius: 2rem;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.4rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.4rem;
        color: white;
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
.EmojiPickerReact {
    position: absolute !important;
    bottom: 40px !important;
    z-index: 10 !important;
    background-color: #080420 !important;
    box-shadow: 0 3px 10px #9a86f3 !important;
    border-color: #9a86f3 !important;
  }
  
  .EmojiPickerReact .epr-search-container input {
    background-color: transparent !important;
    border-color: #9a86f3 !important;
    color: white !important;
  }
  
  .EmojiPickerReact .epr-body::-webkit-scrollbar {
    width: 5px !important;
    background-color: #080420 !important;
  }
  
  .EmojiPickerReact .epr-body::-webkit-scrollbar-thumb {
    background-color: #9a86f3 !important;
    border-radius: 8px !important;
    border: 1px solid #080420 !important;
  }
  
  .EmojiPickerReact .epr-category-nav {
    button {
      filter: contrast(0) !important;
    }
  }
  
  .EmojiPickerReact .epr-group-title {
    background-color: #080420 !important;
    color: white !important;
  }
  
  .EmojiPickerReact .epr-emoji-category-label {
    background-color: #080420 !important;
  }
`;

export default ChatInput;
