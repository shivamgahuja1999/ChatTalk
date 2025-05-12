import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Welcome from "../components/Welcome";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import {
  getAllMessagesRoute,
  sendMessageRoute,
} from "../../../uitls/APIRoutes";
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = ({ currentChat, currentUser, socket}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessage = async () => {
      if (!currentUser?._id || !currentChat?._id) return;
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
       
        setMessages(response.data);
        
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessage();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    const msgs=[...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(()=>{
    if (socket.current)  {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }

  },[socket.current]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {currentChat ? (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div
                className="avatar"
                dangerouslySetInnerHTML={{ __html: currentChat.avatarImage }}
              ></div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
              );
            })}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      ) : (
        <Welcome currentUser={currentUser} />
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 82% 8%;
  padding-top: 0.5rem;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 900px) and (max-width: 1080px) {
    grid-template-rows: 10% 82% 8%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        display: flex;
        height: 3rem;
        width: 3rem;
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #080420;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ffffff39;
    border-radius: 8px;
    border: 1px solid #080420;
  }
    .message {
      display: flex;
      align-items: center;
      &.sended {
        justify-content: flex-end;
        .content {
          background-color: #4f04ff21;
        }
      }
      &.received {
        justify-content: flex-start;
        .content {
          background-color: #9900ff20;
        }
      }
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.6rem;
        font-size: 1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
  }

`;
export default ChatContainer;
