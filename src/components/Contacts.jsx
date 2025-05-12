import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo1.svg";

const Contacts = ({ contacts, currentUser,changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatTalk</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div
                    className="avatar"
                    dangerouslySetInnerHTML={{ __html: contact.avatarImage }}
                  ></div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}

          </div>
          <div className="current-user">
            <div
              className="avatar"
              dangerouslySetInnerHTML={{ __html: currentUserImage }}
            ></div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #080420;
  overflow: hidden;
  padding: 1rem 0;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 1rem; */
    img {
      height: 5rem;
    }
    h3 {
      color: white;
      /* text-transform: uppercase; */
    }
  }
  .contacts {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.6rem;
    margin-top: 0.5rem;
    width: 100%;
    max-height: 60vh;
    /* padding: 0 0.5rem; */
    .contact {
      background-color: #ffffff34;
      min-height: 4rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: 0.3s ease-in-out;
      padding: 0.4rem;
      .avatar {
        height: 3rem;
        width: 3rem;
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .contact.selected{
        background-color: #9a86f3;
      }

    &::-webkit-scrollbar {
      width: 0.1rem;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #9186f3;
      border-radius: 1rem;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    margin-top: 5rem;
    width: 100%;
    border-top: 1px solid #ffffff34;
    .avatar {
      height: 3rem;
      width: 3rem;
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 1rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
