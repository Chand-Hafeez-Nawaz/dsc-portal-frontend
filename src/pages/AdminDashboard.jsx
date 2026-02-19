import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { toast } from "react-toastify";

function AdminDashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [editId, setEditId] = useState(null);

  const [galleryImagesToUpload, setGalleryImagesToUpload] = useState([]);;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
    fetchSchools();
    fetchGallery();
  }, []);

  /* ================= FETCH EVENTS ================= */
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://dsc-portal-backend-5eaw.onrender.com/api/events");
      setEvents(res.data);
    } catch {
      console.log("Failed to fetch events");
    }
  };

  /* ================= FETCH SCHOOLS ================= */
  const fetchSchools = async () => {
    try {
      const res = await axios.get(
        "https://dsc-portal-backend-5eaw.onrender.com/api/schools",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSchools(res.data);
    } catch {
      console.log("Failed to fetch schools");
    }
  };

  /* ================= FETCH GALLERY ================= */
  const fetchGallery = async () => {
    try {
      const res = await axios.get("https://dsc-portal-backend-5eaw.onrender.com/api/gallery");
      setGalleryImages(res.data);
    } catch {
      console.log("Failed to fetch gallery");
    }
  };

  /* ================= CREATE / UPDATE EVENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    if (brochure) formData.append("brochure", brochure);

    try {
      if (editId) {
        await axios.put(
          `https://dsc-portal-backend-5eaw.onrender.com/api/events/${editId}`,
          formData
        );
        setEditId(null);
      } else {
        await axios.post(
          "https://dsc-portal-backend-5eaw.onrender.com/api/events",
          formData
        );
      }

      setTitle("");
      setDescription("");
      setDate("");
      setBrochure(null);

      fetchEvents();
    } catch {
      toast.error("Event operation failed ❌");
    }
  };

  /* ================= EDIT EVENT ================= */
  const handleEditEvent = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date?.substring(0, 10));
    setEditId(event._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE EVENT ================= */
  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://dsc-portal-backend-5eaw.onrender.com/api/events/${id}`
      );
      fetchEvents();
    } catch {
      toast.error("Delete Failed ❌");
    }
  };


  /* ================= GALLERY UPLOAD ================= */
const handleGalleryUpload = async (e) => {
  e.preventDefault();

  if (!galleryImagesToUpload.length) {
    toast.warning("Please select images");
    return;
  }

  const formData = new FormData();

  for (let i = 0; i < galleryImagesToUpload.length; i++) {
    formData.append("images", galleryImagesToUpload[i]);
  }

  try {
    await axios.post(
      "https://dsc-portal-backend-5eaw.onrender.com/api/gallery/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    toast.success("Images uploaded successfully ✅");
    setGalleryImagesToUpload([]);
    fetchGallery();
  } catch (err) {
    console.log(err);
    toast.error("Gallery upload failed ❌");
  }
};
  /* ================= DELETE GALLERY IMAGE ================= */
  const handleDeleteImage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://dsc-portal-backend-5eaw.onrender.com/api/gallery/${id}`
      );
      fetchGallery();
    } catch {
      toast.error("Delete Failed ❌");
    }
  };

  return (
    <div className="admin-dashboard">

      {/* ================= REPORT BUTTONS ================= */}
      <div className="external-data-card">
        <h2>Data & Reports</h2>
        <div className="report-buttons">

          <a
            href="https://docs.google.com/forms/d/1WeWL29wvviqe1exda_rYBclFeb73zfdmYW-Xw7irmZw/edit#responses"
            target="_blank"
            rel="noreferrer"
            className="gov-btn"
          >
            Feedback Responses
          </a>

          <a
            href="https://docs.google.com/forms/d/1x3tnOTAE2ebVq1SzCfBmSXUdYrhcHdarTSnBYdsh5dc/edit#responses"
            target="_blank"
            rel="noreferrer"
            className="gov-btn"
          >
            Student List Responses
          </a>

          <button
            className="gov-btn"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>

        </div>
      </div>

      {/* ================= CREATE EVENT ================= */}
      <div className="create-card">
        <h2>{editId ? "Update Event" : "Create Event"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="file"
            onChange={(e) => setBrochure(e.target.files[0])}
          />

          <button className="gov-btn">
            {editId ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>

      {/* ================= EVENTS ================= */}
      <h2 className="section-title">All Events</h2>
      <div className="card-grid">
        {events.map((event) => (
          <div key={event._id} className="card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toDateString()}</p>

            {event.brochure && (
              <a
                href={`https://dsc-portal-backend-5eaw.onrender.com/${event.brochure}`}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                Download Brochure
              </a>
            )}

            <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => handleEditEvent(event)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDeleteEvent(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= GALLERY ================= */}
      <h2 className="section-title">Gallery Images</h2>

      <div className="gallery-upload-card">
        <form onSubmit={handleGalleryUpload}>
          <input
            type="file"
            multiple
            onChange={(e) => setGalleryImagesToUpload(e.target.files)}
          />
          <button className="gov-btn">Upload Image</button>
        </form>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((img) => (
          <div key={img._id} className="gallery-card">
            <img
              src={`https://dsc-portal-backend-5eaw.onrender.com/${img.image}`}
              alt="gallery"
              className="gallery-img"
            />
            <button
              className="delete-btn"
              onClick={() => handleDeleteImage(img._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;