import React, { useState, useEffect, useLayoutEffect } from "react";
import "./style.css";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/auth-context";
import { actionTypes } from "../../context/reducer";

const fetchToken = async (username, password) => {
  return axios
    .post("http://localhost:3001/login", { username, password })
    .then((response) => response.data);
};
const fetchCurrentUserInfo = (token) => {
  return axios
    .get("http://localhost:3001/users/me", {
      headers: {
        authorization: token,
      },
    })
    .then((response) => response.data);
};
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const { loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    fetchToken(username, password).then(({ success, data }) => {
      if (success) {
        setToken(data);
      }
    });
  };
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
      setToken(token);
    }
  }, [dispatch]);
  useEffect(() => {
    if (token) {
      fetchCurrentUserInfo(token).then(({ success, data }) => {
        if (success) {
          localStorage.setItem("token", token);
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: {
              user: data,
              token,
            },
          });
        }
      });
    }
  }, [token, dispatch]);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="login">
          <h1>Login</h1>
          <form method="post" onSubmit={handleLogin}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required="required"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required="required"
            />
            <button
              type="submit"
              className="btn btn-primary btn-block btn-large"
            >
              Let me in.
            </button>
          </form>
        </div>
      )}
    </>
  );
}
