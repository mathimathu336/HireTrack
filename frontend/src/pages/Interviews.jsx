import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Interviews.css";

function Interviews() {
  const [interviews, setInterviews] = useState([]);

  const [form, setForm] = useState({
    company: "",
    role: "",
    date: "",
    time: "",
    type: "Online",
    status: "Scheduled",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const response = await API.get("/interviews");
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
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
      company: "",
      role: "",
      date: "",
      time: "",
      type: "Online",
      status: "Scheduled",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        company: form.company,
        role: form.role,
        date: form.date,
        time: form.time,
        type: form.type,
        status: form.status,
      };

      if (editingId) {
        await API.put(`/interviews/${editingId}`, data);
        alert("Interview updated successfully!");
      } else {
        await API.post("/interviews", data);
        alert("Interview added successfully!");
      }

      await loadInterviews();
      resetForm();
    } catch (error) {
      console.error("Error saving interview:", error);
      alert("Failed to save interview");
    }
  };

  const handleEdit = (interview) => {
    setEditingId(interview.id);

    setForm({
      company: interview.company || "",
      role: interview.role || "",
      date: interview.date || "",
      time: interview.time || "",
      type: interview.type || "Online",
      status: interview.status || "Scheduled",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/interviews/${id}`);

      alert("Interview deleted successfully!");

      await loadInterviews();
    } catch (error) {
      console.error("Error deleting interview:", error);
      alert("Failed to delete interview");
    }
  };

  return (
    <div className="interviews-page">

      {/* NAVBAR */}
      <header className="interviews-navbar">

        <div className="brand">
          <div className="brand-icon">H</div>
          <span>HireTrack</span>
        </div>

        <nav className="navigation">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/applications">
            Applications
          </Link>

          <Link to="/interviews" className="active">
            Interviews
          </Link>

          <Link to="/skills">
            Skills
          </Link>

          <Link to="/resume">
            Resume
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </nav>

        <Link to="/" className="logout-button">
          Logout
        </Link>

      </header>


      {/* MAIN */}
      <main className="interviews-main">

        {/* PAGE HEADER */}
        <div className="interviews-header">

          <div>
            <h1>Interviews</h1>

            <p>
              Schedule and manage your upcoming interviews
            </p>
          </div>

          <div className="interviews-count">
            {interviews.length} Interviews
          </div>

        </div>


        {/* FORM */}
        <section className="interview-form-card">

          <h2>
            {editingId
              ? "Edit Interview"
              : "Schedule New Interview"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* COMPANY */}
              <div className="form-group">

                <label>Company</label>

                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
                />

              </div>


              {/* ROLE */}
              <div className="form-group">

                <label>Role</label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Job role"
                  required
                />

              </div>


              {/* DATE */}
              <div className="form-group">

                <label>Interview Date</label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TIME */}
              <div className="form-group">

                <label>Interview Time</label>

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TYPE */}
              <div className="form-group">

                <label>Interview Type</label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >

                  <option value="Online">
                    Online
                  </option>

                  <option value="Offline">
                    Offline
                  </option>

                  <option value="Phone">
                    Phone
                  </option>

                </select>

              </div>


              {/* STATUS */}
              <div className="form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >

                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                  <option value="Selected">
                    Selected
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>


            {/* BUTTONS */}
            <div className="form-buttons">

              <button
                type="submit"
                className="primary-button"
              >
                {editingId
                  ? "Update Interview"
                  : "Schedule Interview"}
              </button>


              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>


        {/* INTERVIEW LIST */}
        <section className="interviews-list">

          <div className="section-title">

            <h2>
              Your Interviews
            </h2>

            <span>
              {interviews.length} total
            </span>

          </div>


          {interviews.length === 0 ? (

            <div className="empty-state">

              <h3>
                No interviews yet
              </h3>

              <p>
                Schedule your first interview above.
              </p>

            </div>

          ) : (

            <div className="interview-cards">

              {interviews.map((interview) => (

                <div
                  className="interview-card"
                  key={interview.id}
                >

                  {/* TOP */}
                  <div className="interview-card-top">

                    <div>

                      <h3>
                        {interview.company}
                      </h3>

                      <p className="interview-role">
                        {interview.role}
                      </p>

                    </div>


                    <span
                      className={`status-badge ${
                        interview.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {interview.status}
                    </span>

                  </div>


                  {/* DETAILS */}
                  <div className="interview-details">

                    <div>

                      <span className="detail-label">
                        Date
                      </span>

                      <span>
                        {interview.date || "Not specified"}
                      </span>

                    </div>


                    <div>

                      <span className="detail-label">
                        Time
                      </span>

                      <span>
                        {interview.time || "Not specified"}
                      </span>

                    </div>


                    <div>

                      <span className="detail-label">
                        Type
                      </span>

                      <span>
                        {interview.type || "Not specified"}
                      </span>

                    </div>

                  </div>


                  {/* ACTIONS */}
                  <div className="interview-actions">

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        handleEdit(interview)
                      }
                    >
                      ✏️ Edit
                    </button>


                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDelete(interview.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Interviews;