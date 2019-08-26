import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="home">
      <Link className="button" to="/users">
        투두
      </Link>
      <Link className="button" to="/boards">
        게시판
      </Link>
    </div>
  );
};

export default Home;
