import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Resume.css";

function Resume() {
  const [resumes, setResumes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    version: "",
    status: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    pdf: null,
  });

  const [loading, setLoading] = useState(false);

  const loadResumes = async () => {
    try {
      const response = await API.get("/resumes");
      setResumes(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load resumes");
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter resume name");
      return;
    }

    if (!form.pdf) {
      alert("Please upload your resume PDF");
      return;
    }

    if (form.pdf.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("version", form.version);
      formData.append("status", form.status);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("education", form.education);
      formData.append("skills", form.skills);
      formData.append("projects", form.projects);
      formData.append("experience", form.experience);
      formData.append("pdf", form.pdf);

      await API.post("/resumes", formData);

      alert("Resume uploaded successfully!");

      setForm({
        name: "",
        version: "",
        status: "",
        email: "",
        phone: "",
        education: "",
        skills: "",
        projects: "",
        experience: "",
        pdf: null,
      });

      document.getElementById("resumePdf").value = "";

      await loadResumes();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error || "Failed to upload resume"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/resumes/${id}`);

      alert("Resume deleted successfully!");

      loadResumes();
    } catch (error) {
      console.error(error);
      alert("Failed to delete resume");
    }
  };

  const openPdf = (id) => {
    window.open(
      `http://127.0.0.1:5000/api/resumes/${id}/pdf`,
      "_blank"
    );
  };

  return (
    <div className="resume-page">

      {/* Navbar */}
      <nav className="resume-navbar">
        <div className="resume-brand">
          <div className="resume-logo">H</div>
          <span>HireTrack</span>
        </div>

        <div className="resume-nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/applications">Applications</a>
          <a href="/interviews">Interviews</a>
          <a href="/skills">Skills</a>
          <a href="/resume" className="active">
            Resume
          </a>
          <a href="/profile">Profile</a>
        </div>

        <button
          className="resume-logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </nav>

      <main className="resume-container">

        {/* Header */}
        <div className="resume-header">
          <div>
            <h1>My Resumes</h1>
            <p>
              Upload and manage multiple versions of your resume.
            </p>
          </div>
        </div>

        {/* Add Resume */}
        <div className="resume-card">
          <h2>Add New Resume</h2>

          <form onSubmit={handleSubmit}>

            <div className="resume-grid">

              <div className="form-group">
                <label>Resume Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Example: Full Stack Resume"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Version</label>
                <input
                  type="text"
                  name="version"
                  placeholder="Example: 1.0"
                  value={form.version}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Old">Old</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  placeholder="B.Tech AI & DS"
                  value={form.education}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Skills</label>
                <textarea
                  name="skills"
                  placeholder="Python, Java, HTML, CSS, JavaScript..."
                  value={form.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Projects</label>
                <textarea
                  name="projects"
                  placeholder="Library Management System, HireTrack..."
                  value={form.projects}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Experience</label>
                <textarea
                  name="experience"
                  placeholder="Python Programming Intern..."
                  value={form.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Upload Resume PDF</label>

                <input
                  id="resumePdf"
                  type="file"
                  name="pdf"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                />

                {form.pdf && (
                  <p className="selected-file">
                    Selected: {form.pdf.name}
                  </p>
                )}
              </div>

            </div>

            <button
              type="submit"
              className="upload-btn"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

          </form>
        </div>

        {/* Resume List */}
        <div className="resume-list-section">

          <div className="section-title">
            <h2>Saved Resumes</h2>
            <span>{resumes.length} Resume(s)</span>
          </div>

          {resumes.length === 0 ? (
            <div className="empty-resume">
              <h3>No resumes uploaded yet</h3>
              <p>Upload your first resume PDF above.</p>
            </div>
          ) : (
            <div className="resume-list">

              {resumes.map((resume) => (
                <div className="saved-resume-card" key={resume.id}>

                  <div className="resume-card-top">

                    <div>
                      <h3>{resume.name}</h3>

                      <p>
                        Version: {resume.version || "Not specified"}
                      </p>
                    </div>

                    <span
                      className={`status ${
                        resume.status?.toLowerCase()
                      }`}
                    >
                      {resume.status || "No Status"}
                    </span>

                  </div>

                  <div className="resume-details">

                    {resume.email && (
                      <p>
                        <strong>Email:</strong> {resume.email}
                      </p>
                    )}

                    {resume.phone && (
                      <p>
                        <strong>Phone:</strong> {resume.phone}
                      </p>
                    )}

                    {resume.pdf_filename && (
                      <p>
                        <strong>PDF:</strong>{" "}
                        {resume.pdf_filename}
                      </p>
                    )}

                    {resume.updated && (
                      <p>
                        <strong>Updated:</strong> {resume.updated}
                      </p>
                    )}

                  </div>

                  <div className="resume-actions">

                    {resume.pdf_filename && (
                      <button
                        className="view-btn"
                        onClick={() => openPdf(resume.id)}
                      >
                        View PDF
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteResume(resume.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default Resume;