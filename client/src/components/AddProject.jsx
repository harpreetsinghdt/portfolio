import { useEffect, useState } from "react";

// import { CORE_CONCEPTS } from "./data.js";
import Header from "./Header/Header.jsx";
// import CoreConcept from "./CoreConcept.jsx";
// import TabButton from "./TabButton.jsx";
// import { EXAMPLES } from "./data.js";

function AddProject() {
  const [selectedTopic, setSelectedTopic] = useState();
  const [projects, setProjects] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submitted.");

    // Get form element
    const form = event.target;

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());

    // Optionally, process data or modify it here

    // Send data using fetch API
    fetch(apiUrl + "/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Sending data as JSON
      },
      body: JSON.stringify(data), // Convert the form data to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log("Response:", data);
        alert("Form submitted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit form.");
      });
  }

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
        <section id="examples">
          <h2>Add Project</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input type="text" id="projectName" name="title" required />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description</label>
              <textarea
                id="projectDescription"
                name="description"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="projectCode">Project Code</label>
              <textarea id="projectCode" name="code" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">image</label>
              <input type="text" id="image" name="image" required />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" name="startDate" />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" name="endDate" />
            </div>
            <div className="form-group">
              <button type="submit">Add Project</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddProject;
