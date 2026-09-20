import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [
        applicationsResponse,
        interviewsResponse,
        skillsResponse,
        resumesResponse,
        profileResponse,
      ] = await Promise.all([
        API.get("/applications"),
        API.get("/interviews"),
        API.get("/skills"),
        API.get("/resumes"),
        API.get("/profile"),
      ]);

      setApplications(applicationsResponse.data || []);
      setInterviews(interviewsResponse.data || []);
      setSkills(skillsResponse.data || []);
      setResumes(resumesResponse.data || []);
      setProfile(profileResponse.data || null);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  /* ================= COUNTS ================= */

  const applicationCount = applications.length;

  const interviewCount = interviews.length;

  const skillCount = skills.length;

  const resumeCount = resumes.length;

  /* ================= PROFILE PROGRESS ================= */

  const profileFields = [
    profile?.name,
    profile?.email,
    profile?.phone,
    profile?.college,
    profile?.role,
  ];

  const completedProfileFields = profileFields.filter(
    (field) =>
      field &&
      String(field).trim() !== ""
  ).length;

  const profileProgress = Math.round(
    (completedProfileFields / profileFields.length) * 100
  );

  /* ================= SKILLS PROGRESS ================= */

  const skillProgress = Math.min(skillCount * 20, 100);

  /* ================= RESUME PROGRESS ================= */

  const resumeProgress = resumeCount > 0 ? 100 : 0;

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}

      <header className="dashboard-navbar">

        <div className="dashboard-brand">
          <div className="dashboard-logo">
            H
          </div>

          <span>
            HireTrack
          </span>
        </div>

        <nav className="dashboard-navigation">

          <Link
            to="/dashboard"
            className="active"
          >
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

          <Link to="/profile">
            Profile
          </Link>

        </nav>

        <Link
          to="/"
          className="dashboard-logout"
        >
          Logout
        </Link>

      </header>

      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* ================= WELCOME ================= */}

        <section className="dashboard-welcome">

          <div>

            <div className="dashboard-small-label">
              CAREER DASHBOARD
            </div>

            <h1>
              Welcome to HireTrack 👋
            </h1>

            <p>
              Manage your job applications,
              interviews, skills and resume
              from one place.
            </p>

          </div>

          <Link
            to="/applications"
            className="quick-apply-button"
          >
            + Add Application
          </Link>

        </section>

        {/* ================= STATISTICS ================= */}

        <section className="dashboard-stats">

          {/* APPLICATIONS */}

          <div className="stat-card">

            <div className="stat-icon blue">
              📋
            </div>

            <div className="stat-content">

              <span>
                Total Applications
              </span>

              <strong>
                {applicationCount}
              </strong>

              <small>
                Applications tracked
              </small>

            </div>

          </div>

          {/* INTERVIEWS */}

          <div className="stat-card">

            <div className="stat-icon purple">
              📅
            </div>

            <div className="stat-content">

              <span>
                Interviews
              </span>

              <strong>
                {interviewCount}
              </strong>

              <small>
                Upcoming interviews
              </small>

            </div>

          </div>

          {/* SKILLS */}

          <div className="stat-card">

            <div className="stat-icon green">
              🎯
            </div>

            <div className="stat-content">

              <span>
                Skills
              </span>

              <strong>
                {skillCount}
              </strong>

              <small>
                Skills added
              </small>

            </div>

          </div>

          {/* RESUMES */}

          <div className="stat-card">

            <div className="stat-icon orange">
              📄
            </div>

            <div className="stat-content">

              <span>
                Resume
              </span>

              <strong>
                {resumeCount}
              </strong>

              <small>
                Resume versions
              </small>

            </div>

          </div>

        </section>

        {/* ================= QUICK ACTIONS ================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Access your career tools quickly.
              </p>

            </div>

          </div>

          <div className="quick-actions">

            {/* APPLICATIONS */}

            <Link
              to="/applications"
              className="action-card"
            >

              <div className="action-icon blue">
                📋
              </div>

              <div>

                <h3>
                  Job Applications
                </h3>

                <p>
                  Add and track your job applications.
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>

            {/* INTERVIEWS */}

            <Link
              to="/interviews"
              className="action-card"
            >

              <div className="action-icon purple">
                📅
              </div>

              <div>

                <h3>
                  Interview Tracker
                </h3>

                <p>
                  Keep track of your upcoming interviews.
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>

            {/* SKILLS */}

            <Link
              to="/skills"
              className="action-card"
            >

              <div className="action-icon green">
                🎯
              </div>

              <div>

                <h3>
                  Skills
                </h3>

                <p>
                  Manage your technical and professional skills.
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>

            {/* RESUME */}

            <Link
              to="/resume"
              className="action-card"
            >

              <div className="action-icon orange">
                📄
              </div>

              <div>

                <h3>
                  Resume
                </h3>

                <p>
                  Manage your resume information.
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </Link>

          </div>

        </section>

        {/* ================= CAREER PROGRESS ================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <h2>
                Career Progress
              </h2>

              <p>
                Keep your profile and career information updated.
              </p>

            </div>

          </div>

          <div className="progress-card">

            {/* PROFILE */}

            <div className="progress-item">

              <div className="progress-top">

                <span>
                  Profile Completion
                </span>

                <strong>
                  {profileProgress}%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${profileProgress}%`,
                  }}
                />

              </div>

            </div>

            {/* SKILLS */}

            <div className="progress-item">

              <div className="progress-top">

                <span>
                  Skills Added
                </span>

                <strong>
                  {skillProgress}%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${skillProgress}%`,
                  }}
                />

              </div>

            </div>

            {/* RESUME */}

            <div className="progress-item">

              <div className="progress-top">

                <span>
                  Resume Ready
                </span>

                <strong>
                  {resumeProgress}%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${resumeProgress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </section>

        {/* ================= BOTTOM CARDS ================= */}

        <section className="dashboard-bottom">

          <div className="info-card">

            <div className="info-card-icon">
              💡
            </div>

            <div>

              <h3>
                Build Your Profile
              </h3>

              <p>
                Add your personal and career details
                to complete your HireTrack profile.
              </p>

              <Link to="/profile">
                Update Profile →
              </Link>

            </div>

          </div>

          <div className="info-card">

            <div className="info-card-icon">
              🚀
            </div>

            <div>

              <h3>
                Ready for Your Next Opportunity?
              </h3>

              <p>
                Keep your applications and interview
                information updated throughout your
                job search.
              </p>

              <Link to="/applications">
                View Applications →
              </Link>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;