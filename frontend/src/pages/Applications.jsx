import { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await API.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- ADD / UPDATE ----------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        await API.put(`/applications/${editingId}`, {
          company: form.company,
          role: form.role,
          location: form.location,
          status: form.status,
          application_date: form.date,
        });

        alert("Application updated successfully!");
      } else {
        // ADD
        await API.post("/applications", {
          company: form.company,
          role: form.role,
          location: form.location,
          status: form.status,
          application_date: form.date,
        });

        alert("Application added successfully!");
      }

      await loadApplications();

      // Reset form
      setForm({
        company: "",
        role: "",
        location: "",
        status: "Applied",
        date: "",
      });

      setEditingId(null);

    } catch (error) {
      console.error("Error saving application:", error);
      alert("Failed to save application");
    }
  };

  // ---------------- EDIT ----------------

  const handleEdit = (application) => {
    setEditingId(application.id);

    setForm({
      company: application.company || "",
      role: application.role || "",
      location: application.location || "",
      status: application.status || "Applied",
      date: application.application_date || "",
    });

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/applications/${id}`);

      alert("Application deleted successfully!");

      await loadApplications();

    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };

  // ---------------- CANCEL EDIT ----------------

  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      company: "",
      role: "",
      location: "",
      status: "Applied",
      date: "",
    });
  };

  return (
    <div className="applications-page">

      {/* NAVBAR */}

      <header className="applications-navbar">

        <div className="brand">
          <div className="brand-icon">H</div>
          <span>HireTrack</span>
        </div>

        <nav className="navigation">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link
            to="/applications"
            className="active"
          >
            Applications
          </Link>

          <Link to="/interviews">
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

        <Link
          to="/"
          className="logout-button"
        >
          Logout
        </Link>

      </header>


      {/* MAIN */}

      <main className="applications-main">

        <div className="applications-header">

          <div>
            <h1>Applications</h1>

            <p>
              Track and manage your job applications
            </p>
          </div>

          <div className="applications-count">
            {applications.length} Applications
          </div>

        </div>


        {/* FORM */}

        <section className="application-form-card">

          <h2>
            {editingId
              ? "Edit Application"
              : "Add New Application"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Job role"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
                />

              </div>


              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                  <option value="Selected">
                    Selected
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Application Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-buttons">

              <button
                type="submit"
                className="primary-button"
              >
                {editingId
                  ? "Update Application"
                  : "Add Application"}
              </button>


              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>


        {/* APPLICATION LIST */}

        <section className="applications-list">

          <div className="section-title">

            <h2>
              Your Applications
            </h2>

            <span>
              {applications.length} total
            </span>

          </div>


          {applications.length === 0 ? (

            <div className="empty-state">

              <h3>
                No applications yet
              </h3>

              <p>
                Add your first job application above.
              </p>

            </div>

          ) : (

            <div className="application-cards">

              {applications.map((application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  <div className="application-card-top">

                    <div>

                      <h3>
                        {application.company}
                      </h3>

                      <p className="application-role">
                        {application.role}
                      </p>

                    </div>


                    <span
                      className={`status-badge ${application.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {application.status}
                    </span>

                  </div>


                  <div className="application-details">

                    <div>

                      <span className="detail-label">
                        Location
                      </span>

                      <span>
                        {application.location || "Not specified"}
                      </span>

                    </div>


                    <div>

                      <span className="detail-label">
                        Applied Date
                      </span>

                      <span>
                        {application.application_date ||
                          "Not specified"}
                      </span>

                    </div>

                  </div>


                  {/* ACTION BUTTONS */}

                  <div className="application-actions">

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        handleEdit(application)
                      }
                    >
                      ✏️ Edit
                    </button>


                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDelete(application.id)
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

export default Applications;