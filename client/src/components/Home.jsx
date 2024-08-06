import React, { useEffect, useState } from "react";

// import { CORE_CONCEPTS } from "./data.js";
import Header from "./Header/Header.jsx";
import CoreConcept from "./CoreConcept.jsx";
import TabButton from "./TabButton.jsx";
import { EXAMPLES } from "../data.js";

const Home = () => {
  const [selectedTopic, setSelectedTopic] = useState();
  const [projects, setProjects] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  useEffect(() => {
    async function fetchData() {
      await fetch(apiUrl + "/projects", {
        method: "GET", // Optional since GET is the default
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    fetchData();
  }, []);

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic);
  }

  console.log("APP COMPONENT EXECUTING");

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Projects</h2>
          <ul>
            {projects.map((conceptItem) => (
              <CoreConcept key={conceptItem.title} {...conceptItem} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Projects</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
            >
              Components
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "jsx"}
              onSelect={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "props"}
              onSelect={() => handleSelect("props")}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "state"}
              onSelect={() => handleSelect("state")}
            >
              State
            </TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
};

export default Home; // Ensure you have a default export
