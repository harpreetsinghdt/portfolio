import { Link } from "react-router-dom";
import reactImg from "../../assets/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
  const description = reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>Project Essentials</h1>
      <p>
        {description} React projects I will need for almost any app I am going
        to build!
      </p>
      <p>
        <span className="margin-right">
          <Link to="/">Home</Link>
        </span>
        <span className="margin-right">
          <Link to="/add-project">Add Project</Link>
        </span>
      </p>
    </header>
  );
}
