import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    role: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await API.get("/profile");

      if (response.data) {
        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          college: response.data.college || "",
          role: response.data.role || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/profile", profile);

      setSaved(true);

      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  const getInitial = () => {
    if (profile.name.trim()) {
      return profile.name.trim().charAt(0).toUpperCase();
    }

    return "H";
  };

  return (
    <div className="profile-page">

      {/* NAVBAR */}
      <header className="profile-navbar">

        <div className="profile-brand">
          <div className="profile-logo">H</div>
          <span>HireTrack</span>
        </div>

        <nav className="profile-navigation">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/applications">
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

          <Link
            to="/profile"
            className="active"
          >
            Profile
          </Link>

        </nav>

        <Link
          to="/"
          className="profile-logout"
        >
          Logout
        </Link>

      </header>

      {/* MAIN */}
      <main className="profile-main">

        {/* HEADER */}
        <section className="profile-header">

          <div>

            <div className="profile-small-label">
              ACCOUNT SETTINGS
            </div>

            <h1>My Profile</h1>

            <p>
              Manage your personal and professional information.
            </p>

          </div>

          <div className="profile-status">

            <div className="profile-status-dot"></div>

            <span>
              {saved ? "Profile Saved" : "Profile"}
            </span>

          </div>

        </section>

        <div className="profile-layout">

          {/* PROFILE CARD */}
          <aside className="profile-summary-card">

            <div className="profile-avatar">
              {getInitial()}
            </div>

            <h2>
              {profile.name || "Your Name"}
            </h2>

            <p className="profile-role">
              {profile.role || "Career Profile"}
            </p>

            <div className="profile-summary-line"></div>

            <div className="profile-summary-item">

              <span>Email</span>

              <strong>
                {profile.email || "Not added"}
              </strong>

            </div>

            <div className="profile-summary-item">

              <span>Phone</span>

              <strong>
                {profile.phone || "Not added"}
              </strong>

            </div>

            <div className="profile-summary-item">

              <span>College</span>

              <strong>
                {profile.college || "Not added"}
              </strong>

            </div>

          </aside>

          {/* FORM */}
          <section className="profile-form-card">

            <div className="profile-card-heading">

              <div className="profile-heading-icon">
                👤
              </div>

              <div>

                <h2>Personal Information</h2>

                <p>
                  Keep your profile information up to date.
                </p>

              </div>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="profile-form-grid">

                <div className="profile-input-group">

                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="profile-input-group">

                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="profile-input-group">

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={profile.phone}
                    onChange={handleChange}
                  />

                </div>

                <div className="profile-input-group">

                  <label>Career Role</label>

                  <input
                    type="text"
                    name="role"
                    placeholder="e.g. Python Developer"
                    value={profile.role}
                    onChange={handleChange}
                  />

                </div>

                <div className="profile-input-group full-width">

                  <label>College / University</label>

                  <input
                    type="text"
                    name="college"
                    placeholder="Enter your college name"
                    value={profile.college}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="profile-form-footer">

                <p>
                  Your profile information is used to personalize your HireTrack experience.
                </p>

                <button
                  type="submit"
                  className="save-profile-button"
                >
                  Save Profile
                </button>

              </div>

            </form>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Profile;