import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setAvatarRoute } from "../../../uitls/APIRoutes";
import loader from "../../src/assets/loader.gif";
import multiavatar from "@multiavatar/multiavatar/esm";
import { useEffect } from "react";

const SetAvatar = () => {
  const navigate = useNavigate();

  // let svgCode = multiavatar("Binx Bond");

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  };
  useEffect(() => {
      if (!localStorage.getItem("Chat-App-User")) {
        navigate("/login");
      }
    }, []);
  const profilePicture = async () => {
    if(selectedAvatar===undefined){
      toast.error("Please select an avatar",toastOptions);
      return;
    }
    else{
      const user=await JSON.parse(localStorage.getItem("Chat-App-User"));
      const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar]
      })
      if(data.isSet){
        user.isAvtarImageSet=true;
        user.avatarImage=data.image;
        localStorage.setItem("Chat-App-User",JSON.stringify(user));
        navigate("/");
      }
      else{
        toast.error("Error Setting avatar, Please try again",toastOptions);
      }
    }
  };
  useEffect(() => {
    const data = [];
    try {
      for (let i = 0; i < 4; i++) {
        const randomId = Math.floor(Math.random() * 1000).toString();
        const svg = multiavatar(randomId);
        data.push(svg);
      }
    } catch (error) {
      data.push(multiavatar("Binx Bond")); //Use it as a fallback if random avatars fail 
    }
    
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
                dangerouslySetInnerHTML={{ __html: avatar }}
              />
            ))}
          </div>
          <div>
            <button onClick={profilePicture} className="submit-btn">
              Set as Profile Picture
            </button>
          </div>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100cw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.3rem solid transparent;
      border-radius: 5rem;
      padding: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
    }
    svg {
    height: 6rem;
    transition: 0.5s ease-in-out;
  }
  }
  .avatar.selected{
      border: 0.3rem solid #4e0eff;
    }
  .submit-btn {
    background-color: #997af0;
    color: white;
    margin-top: 1rem;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default SetAvatar;
