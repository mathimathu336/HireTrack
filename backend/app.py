from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from datetime import datetime
import os


# =========================================================
# LOAD ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)
CORS(app)


# =========================================================
# DATABASE CONFIGURATION
# =========================================================

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT", "26879")

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    "?ssl_verify_cert=true"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# =========================================================
# RESUME PDF UPLOAD CONFIGURATION
# =========================================================

UPLOAD_FOLDER = os.path.join(app.root_path, "uploads")

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"pdf"}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


# Make sure uploads folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():

    return jsonify({
        "message": "HireTrack Backend + MySQL Connected!"
    })


# =========================================================
# APPLICATIONS
# =========================================================

@app.route("/api/applications", methods=["GET"])
def get_applications():

    applications = db.session.execute(
        db.text("SELECT * FROM applications")
    ).mappings().all()

    return jsonify([
        dict(application)
        for application in applications
    ])


@app.route("/api/applications", methods=["POST"])
def add_application():

    data = request.get_json()

    company = data.get("company")
    role = data.get("role")
    status = data.get("status")
    location = data.get("location")
    application_date = data.get("application_date")

    db.session.execute(
        db.text("""
            INSERT INTO applications
            (company, role, status, location, application_date)
            VALUES
            (:company, :role, :status, :location, :application_date)
        """),
        {
            "company": company,
            "role": role,
            "status": status,
            "location": location,
            "application_date": application_date
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Application added successfully!"
    }), 201


@app.route("/api/applications/<int:id>", methods=["PUT"])
def update_application(id):

    data = request.get_json()

    company = data.get("company")
    role = data.get("role")
    status = data.get("status")
    location = data.get("location")
    application_date = data.get("application_date")

    db.session.execute(
        db.text("""
            UPDATE applications
            SET company = :company,
                role = :role,
                status = :status,
                location = :location,
                application_date = :application_date
            WHERE id = :id
        """),
        {
            "id": id,
            "company": company,
            "role": role,
            "status": status,
            "location": location,
            "application_date": application_date
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Application updated successfully!"
    }), 200


@app.route("/api/applications/<int:id>", methods=["DELETE"])
def delete_application(id):

    db.session.execute(
        db.text("""
            DELETE FROM applications
            WHERE id = :id
        """),
        {
            "id": id
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Application deleted successfully!"
    }), 200


# =========================================================
# INTERVIEWS
# =========================================================

@app.route("/api/interviews", methods=["GET"])
def get_interviews():

    interviews = db.session.execute(
        db.text("SELECT * FROM interviews")
    ).mappings().all()

    return jsonify([
        dict(interview)
        for interview in interviews
    ])


# ---------------- ADD INTERVIEW ----------------

@app.route("/api/interviews", methods=["POST"])
def add_interview():

    data = request.get_json()

    company = data.get("company")
    role = data.get("role")
    date = data.get("date")
    time = data.get("time")
    interview_type = data.get("type")
    status = data.get("status")

    db.session.execute(
        db.text("""
            INSERT INTO interviews
            (company, role, date, time, type, status)
            VALUES
            (:company, :role, :date, :time, :type, :status)
        """),
        {
            "company": company,
            "role": role,
            "date": date,
            "time": time,
            "type": interview_type,
            "status": status
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Interview added successfully!"
    }), 201


# ---------------- UPDATE INTERVIEW ----------------

@app.route("/api/interviews/<int:id>", methods=["PUT"])
def update_interview(id):

    data = request.get_json()

    company = data.get("company")
    role = data.get("role")
    date = data.get("date")
    time = data.get("time")
    interview_type = data.get("type")
    status = data.get("status")

    db.session.execute(
        db.text("""
            UPDATE interviews
            SET company = :company,
                role = :role,
                date = :date,
                time = :time,
                type = :type,
                status = :status
            WHERE id = :id
        """),
        {
            "id": id,
            "company": company,
            "role": role,
            "date": date,
            "time": time,
            "type": interview_type,
            "status": status
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Interview updated successfully!"
    }), 200


# ---------------- DELETE INTERVIEW ----------------

@app.route("/api/interviews/<int:id>", methods=["DELETE"])
def delete_interview(id):

    db.session.execute(
        db.text("""
            DELETE FROM interviews
            WHERE id = :id
        """),
        {
            "id": id
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Interview deleted successfully!"
    }), 200


# =========================================================
# SKILLS
# =========================================================

@app.route("/api/skills", methods=["GET"])
def get_skills():

    skills = db.session.execute(
        db.text("SELECT * FROM skills")
    ).mappings().all()

    return jsonify([
        dict(skill)
        for skill in skills
    ])


# ---------------- ADD SKILL ----------------

@app.route("/api/skills", methods=["POST"])
def add_skill():

    data = request.get_json()

    name = data.get("name")
    level = data.get("level")

    db.session.execute(
        db.text("""
            INSERT INTO skills
            (name, level)
            VALUES
            (:name, :level)
        """),
        {
            "name": name,
            "level": level
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Skill added successfully!"
    }), 201


# ---------------- UPDATE SKILL ----------------

@app.route("/api/skills/<int:id>", methods=["PUT"])
def update_skill(id):

    data = request.get_json()

    name = data.get("name")
    level = data.get("level")

    db.session.execute(
        db.text("""
            UPDATE skills
            SET name = :name,
                level = :level
            WHERE id = :id
        """),
        {
            "id": id,
            "name": name,
            "level": level
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Skill updated successfully!"
    }), 200


# ---------------- DELETE SKILL ----------------

@app.route("/api/skills/<int:id>", methods=["DELETE"])
def delete_skill(id):

    db.session.execute(
        db.text("""
            DELETE FROM skills
            WHERE id = :id
        """),
        {
            "id": id
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Skill deleted successfully!"
    }), 200


# =========================================================
# MULTIPLE RESUMES
# =========================================================

# ---------------- GET ALL RESUMES ----------------

@app.route("/api/resumes", methods=["GET"])
def get_resumes():

    resumes = db.session.execute(
        db.text("""
            SELECT *
            FROM resumes
            ORDER BY id DESC
        """)
    ).mappings().all()

    return jsonify([
        dict(resume)
        for resume in resumes
    ])


# ---------------- GET SINGLE RESUME ----------------

@app.route("/api/resumes/<int:id>", methods=["GET"])
def get_single_resume(id):

    resume = db.session.execute(
        db.text("""
            SELECT *
            FROM resumes
            WHERE id = :id
        """),
        {
            "id": id
        }
    ).mappings().first()

    if not resume:

        return jsonify({
            "message": "Resume not found"
        }), 404

    return jsonify(dict(resume))


# ---------------- ADD RESUME + PDF ----------------

@app.route("/api/resumes", methods=["POST"])
def add_resume():

    name = request.form.get("name")
    version = request.form.get("version")
    status = request.form.get("status")

    email = request.form.get("email")
    phone = request.form.get("phone")

    education = request.form.get("education")
    skills = request.form.get("skills")
    projects = request.form.get("projects")
    experience = request.form.get("experience")

    pdf = request.files.get("pdf")

    if not name:

        return jsonify({
            "message": "Resume name is required"
        }), 400

    pdf_filename = None
    pdf_path = None

    # ---------------- PDF ----------------

    if pdf and pdf.filename:

        if not allowed_file(pdf.filename):

            return jsonify({
                "message": "Only PDF files are allowed"
            }), 400

        original_filename = secure_filename(
            pdf.filename
        )

        timestamp = datetime.now().strftime(
            "%Y%m%d%H%M%S"
        )

        final_filename = (
            f"{timestamp}_{original_filename}"
        )

        pdf.save(
            os.path.join(
                app.config["UPLOAD_FOLDER"],
                final_filename
            )
        )

        pdf_filename = original_filename
        pdf_path = final_filename

    # ---------------- DATABASE ----------------

    db.session.execute(
        db.text("""
            INSERT INTO resumes
            (
                name,
                version,
                status,
                updated,
                email,
                phone,
                education,
                skills,
                projects,
                experience,
                pdf_filename,
                pdf_path
            )
            VALUES
            (
                :name,
                :version,
                :status,
                :updated,
                :email,
                :phone,
                :education,
                :skills,
                :projects,
                :experience,
                :pdf_filename,
                :pdf_path
            )
        """),
        {
            "name": name,
            "version": version,
            "status": status,
            "updated": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
            "email": email,
            "phone": phone,
            "education": education,
            "skills": skills,
            "projects": projects,
            "experience": experience,
            "pdf_filename": pdf_filename,
            "pdf_path": pdf_path
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Resume added successfully!"
    }), 201


# ---------------- VIEW / DOWNLOAD PDF ----------------

@app.route("/api/resumes/<int:id>/pdf", methods=["GET"])
def get_resume_pdf(id):

    resume = db.session.execute(
        db.text("""
            SELECT pdf_path
            FROM resumes
            WHERE id = :id
        """),
        {
            "id": id
        }
    ).mappings().first()

    if not resume or not resume["pdf_path"]:

        return jsonify({
            "message": "PDF not found"
        }), 404

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        resume["pdf_path"]
    )


# ---------------- DELETE RESUME ----------------

@app.route("/api/resumes/<int:id>", methods=["DELETE"])
def delete_resume(id):

    resume = db.session.execute(
        db.text("""
            SELECT pdf_path
            FROM resumes
            WHERE id = :id
        """),
        {
            "id": id
        }
    ).mappings().first()

    if not resume:

        return jsonify({
            "message": "Resume not found"
        }), 404

    # Delete PDF file if it exists
    if resume["pdf_path"]:

        file_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            resume["pdf_path"]
        )

        if os.path.exists(file_path):
            os.remove(file_path)

    # Delete database record
    db.session.execute(
        db.text("""
            DELETE FROM resumes
            WHERE id = :id
        """),
        {
            "id": id
        }
    )

    db.session.commit()

    return jsonify({
        "message": "Resume deleted successfully!"
    }), 200


# =========================================================
# PROFILE
# =========================================================

@app.route("/api/profile", methods=["GET"])
def get_profile():

    profile = db.session.execute(
        db.text("SELECT * FROM profile LIMIT 1")
    ).mappings().first()

    if profile:

        return jsonify(dict(profile))

    return jsonify(None)


@app.route("/api/profile", methods=["POST"])
def save_profile():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    college = data.get("college")
    role = data.get("role")

    existing = db.session.execute(
        db.text("SELECT id FROM profile LIMIT 1")
    ).first()

    if existing:

        db.session.execute(
            db.text("""
                UPDATE profile
                SET name = :name,
                    email = :email,
                    phone = :phone,
                    college = :college,
                    role = :role
                WHERE id = :id
            """),
            {
                "id": existing.id,
                "name": name,
                "email": email,
                "phone": phone,
                "college": college,
                "role": role
            }
        )

    else:

        db.session.execute(
            db.text("""
                INSERT INTO profile
                (name, email, phone, college, role)
                VALUES
                (:name, :email, :phone, :college, :role)
            """),
            {
                "name": name,
                "email": email,
                "phone": phone,
                "college": college,
                "role": role
            }
        )

    db.session.commit()

    return jsonify({
        "message": "Profile saved successfully!"
    }), 201


# =========================================================
# RUN APP
# =========================================================

if __name__ == "__main__":
    app.run(debug=True)