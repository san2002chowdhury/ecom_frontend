// import { useEffect } from "react";
import { BASE_URL } from "../Redux/api";
// import { useDispatch } from "react-redux";

const handleRequest = async () => {
  const response = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: localStorage.getItem("token") }), // Convert JavaScript object to JSON string document.cookie
  };
  await fetch(`${BASE_URL}/user/verify_token`, response)
    .then((data) => data.json())
    .then((data) => {
      console.log("id--->", data);
      localStorage.setItem("flag", 1);
    });
};

export default handleRequest;
