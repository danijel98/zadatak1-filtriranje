import React from "react";
import data from "./data/users.json";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/Users";

function App() {
  return <Users users={data}></Users>;
}

export default App;
