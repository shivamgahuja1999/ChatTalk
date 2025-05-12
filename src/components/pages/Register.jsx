import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.svg";
import styled from "styled-components";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { registerRoute } from "../../../../uitls/APIRoutes";
import { useEffect } from "react";

const Register = () => {
  const navigate=useNavigate();
  const toastOptions={
    position:"bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    }
  };
  useEffect(() => {
      if (localStorage.getItem("Chat-App-User")) {
        navigate("/");
      }
    }, []);
  const { register, handleSubmit,watch} = useForm();
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      const { username, email, password} = data;
      const response = await axios.post(registerRoute,{
        username,
        email,
        password,
      });
      const { status,message, newUser } = response.data;
      if (!status) {
        toast.error(message,toastOptions);
        return;
      }

      localStorage.setItem('Chat-App-User', JSON.stringify(newUser));
      toast.success("Registration successful!", toastOptions);
      navigate('/');
    
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed!";
      toast.error(message, toastOptions);
    }
  };
  const onError = (errors) => {
    Object.values(errors).forEach((err) => {
      toast.error(err.message || "Invalid input", toastOptions);
    });
  };
  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit,onError)}>
          <div className="brand">
            <img src={logo} alt="Chat logo" />
            <h1>ChatTalk</h1>
          </div>
          <label>User Name</label>
          <input
            type="text"
            placeholder="User name"
            {...register("username", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
              // message: "Username should contain only letters",
            })}

          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { 
              required: true ,
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                // message: "Enter a valid email address",
              },
            })}
            
          />
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            {...register("password", {
              required: true,
              // message: "Password should be at least 8 characters",
            })}
            
          />
          
          <label>Confirm Password</label>
          <input
            placeholder="confirm password"
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </div>
  );
};

const FormContainer = styled.div`
  width: 100vw;
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:1rem;
  background-color:#131324;
  .brand{
    display:flex;
    align-items:center;
    /* gap:1rem; */
    justify-content:center;
    img{
        height:6rem;
    }
    h1{
      color: white;
      /* text-transform: uppercase; */
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 3rem 4rem;
    background-color: #00000076;
    border-radius: 2rem;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus{
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button{
      background-color: #997af0;
      color: white;
      margin-top: 1rem;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      border-radius:0.4rem;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color: #4e0eff;
      }
    }
    span{
      margin-top: 1rem;
      color: white;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
