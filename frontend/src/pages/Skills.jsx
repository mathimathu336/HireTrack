import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState({
    name: "",
    level: "Beginner",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await API.get("/skills");
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      level: "Beginner",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: form.name,
        level: form.level,
      };

      if (editingId) {
        await API.put(`/skills/${editingId}`, data);

        alert("Skill updated successfully!");
      } else {
        await API.post("/skills", data);

        alert("Skill added successfully!");
      }

      await loadSkills();

      resetForm();
    } catch (error) {
      console.error("Error saving skill:", error);

      alert("Failed to save skill");
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setForm({
      name: skill.name || "",
      level: skill.level || "Beginner",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/skills/${id}`);

      alert("Skill deleted successfully!");

      await loadSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);

      alert("Failed to delete skill");
    }
  };

  return (
    <div className="skills-page">

      {/* ================= NAVBAR ================= */}

      <header className="skills-navbar">

        <div className="skills-brand">
          <div className="skills-logo">
            H
          </div>

          <span>
            HireTrack
          </span>
        </div>


        <nav className="skills-navigation">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/applications">
            Applications
          </Link>

          <Link to="/interviews">
            Interviews
          </Link>

          <Link
            to="/skills"
            className="active"
          >
            Skills
          </Link>

          <Link to="/resume">
            Resume
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </nav>


        <Link
          to="/"
          className="skills-logout"
        >
          Logout
        </Link>

      </header>


      {/* ================= MAIN ================= */}

      <main className="skills-main">


        {/* ================= HEADER ================= */}

        <section className="skills-header">

          <div>

            <div className="skills-small-label">
              CAREER DEVELOPMENT
            </div>

            <h1>
              My Skills
            </h1>

            <p>
              Manage your technical and professional skills in one place.
            </p>

          </div>


          <div className="skills-total">

            <span>
              Total Skills
            </span>

            <strong>
              {skills.length}
            </strong>

          </div>

        </section>


        {/* ================= ADD / EDIT FORM ================= */}

        <section className="skills-form-card">

          <div className="skills-section-title">

            <div className="skills-section-icon">
              {editingId ? "✏️" : "+"}
            </div>

            <div>

              <h2>
                {editingId
                  ? "Edit Skill"
                  : "Add New Skill"}
              </h2>

              <p>
                {editingId
                  ? "Update your skill information."
                  : "Add a skill and specify your proficiency level."}
              </p>

            </div>

          </div>


          <form
            className="skills-form"
            onSubmit={handleSubmit}
          >


            {/* SKILL NAME */}

            <div className="skills-input-group">

              <label>
                Skill Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Python"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* LEVEL */}

            <div className="skills-input-group">

              <label>
                Skill Level
              </label>

              <select
                name="level"
                value={form.level}
                onChange={handleChange}
              >

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

            </div>


            {/* BUTTONS */}

            <div className="skills-button-area">

              <button
                type="submit"
                className="skills-primary-button"
              >
                {editingId
                  ? "Update Skill"
                  : "+ Add Skill"}
              </button>


              {editingId && (

                <button
                  type="button"
                  className="skills-cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>


        {/* ================= SKILLS LIST ================= */}

        <section className="skills-list-section">


          <div className="skills-list-header">

            <div>

              <h2>
                Your Skills
              </h2>

              <p>
                Skills you have added to your career profile.
              </p>

            </div>


            <span className="skills-count-badge">
              {skills.length} Skills
            </span>

          </div>


          {/* EMPTY STATE */}

          {skills.length === 0 ? (

            <div className="skills-empty-state">

              <div className="skills-empty-icon">
                🎯
              </div>

              <h3>
                No Skills Added Yet
              </h3>

              <p>
                Add your first skill using the form above.
              </p>

            </div>

          ) : (

            /* SKILL CARDS */

            <div className="skills-grid">

              {skills.map((skill) => (

                <article
                  className="skill-card"
                  key={skill.id}
                >


                  {/* CARD TOP */}

                  <div className="skill-card-top">

                    <div className="skill-avatar">

                      {skill.name
                        ? skill.name
                            .charAt(0)
                            .toUpperCase()
                        : "S"}

                    </div>


                    <div className="skill-info">

                      <h3>
                        {skill.name}
                      </h3>

                      <span>
                        Technical Skill
                      </span>

                    </div>

                  </div>


                  <div className="skill-card-line" />


                  {/* LEVEL */}

                  <div className="skill-level-row">

                    <span>
                      Proficiency
                    </span>


                    <strong
                      className={`skill-level ${
                        (
                          skill.level || ""
                        ).toLowerCase()
                      }`}
                    >
                      {skill.level || "Beginner"}
                    </strong>

                  </div>


                  {/* PROGRESS */}

                  <div className="skill-progress">

                    <div
                      className={`skill-progress-fill ${
                        (
                          skill.level ||
                          "Beginner"
                        ).toLowerCase()
                      }`}
                      style={{
                        width:
                          skill.level === "Advanced"
                            ? "90%"
                            : skill.level ===
                              "Intermediate"
                            ? "65%"
                            : "35%",
                      }}
                    />

                  </div>


                  {/* ACTIONS */}

                  <div className="skill-actions">

                    <button
                      type="button"
                      className="skill-edit-button"
                      onClick={() =>
                        handleEdit(skill)
                      }
                    >
                      ✏️ Edit
                    </button>


                    <button
                      type="button"
                      className="skill-delete-button"
                      onClick={() =>
                        handleDelete(skill.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>


                </article>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Skills;