import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { toast } from "react-toastify";

function AdminDashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [editId, setEditId] = useState(null);

  const [galleryImagesToUpload, setGalleryImagesToUpload] = useState([]);
  const [fileKey, setFileKey] = useState(Date.now());
  const [galleryKey, setGalleryKey] = useState(Date.now());

  useEffect(() => {
    fetchEvents();
    fetchGallery();
  }, []);

  /* ================= FETCH EVENTS ================= */
  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events");
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Events fetch error:", error);
      setEvents([]);
    }
  };

  /* ================= FETCH GALLERY ================= */
  const fetchGallery = async () => {
    try {
      const res = await api.get("/api/gallery");
      setGalleryImages(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Gallery fetch error:", error);
      setGalleryImages([]);
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
        await api.put(`/api/events/${editId}`, formData);
        toast.success("Event updated ✅");
      } else {
        await api.post("/api/events", formData);
        toast.success("Event created ✅");
      }

      setTitle("");
      setDescription("");
      setDate("");
      setBrochure(null);
      setEditId(null);
      setFileKey(Date.now());
      fetchEvents();
    } catch (error) {
      console.error("Event save error:", error);
      toast.error("Event operation failed ❌");
    }
  };

  /* ================= DELETE EVENT ================= */
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/api/events/${id}`);
      toast.success("Event deleted ✅");
      fetchEvents();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete failed ❌");
    }
  };

  /* ================= GALLERY UPLOAD ================= */
  const handleGalleryUpload = async (e) => {
  e.preventDefault();

  if (!galleryImagesToUpload.length) {
    toast.warning("Select images first");
    return;
  }

  const formData = new FormData();

  for (let i = 0; i < galleryImagesToUpload.length; i++) {
  formData.append("images", galleryImagesToUpload[i]); // ✅ must match backend
}

  try {
    await api.post("/api/gallery/upload", formData);

    toast.success("Images uploaded ✅");
    setGalleryImagesToUpload([]);
    setGalleryKey(Date.now());
    fetchGallery();
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);
    toast.error("Gallery upload failed ❌");
  }
};

  /* ================= DELETE IMAGE ================= */
  const handleDeleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/api/gallery/${id}`);
      toast.success("Image deleted ✅");
      fetchGallery();
    } catch (error) {
      console.error("Image delete error:", error);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="admin-dashboard">

      {/* ===== REPORT / ACTION BUTTONS ===== */}
      <div className="report-buttons">
        <button
          className="gov-btn"
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </button>

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
            key={fileKey}
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
    href={event.brochure}
    download={event.brochure.split("/").pop()}
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
                onClick={() => {
                  setTitle(event.title);
                  setDescription(event.description);
                  setDate(event.date?.substring(0, 10));
                  setEditId(event._id);
                }}
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
      <h2 className="section-title">Gallery</h2>

      <form onSubmit={handleGalleryUpload} className="gallery-upload-form">
        <input
          key={galleryKey}
          type="file"
          multiple
          onChange={(e) => setGalleryImagesToUpload(e.target.files)}
        />
        <button className="gov-btn">Upload</button>
      </form>

      <div className="gallery-grid">
        {galleryImages.map((img) => (
          <div key={img._id} className="gallery-card">
            <img src={img.image} alt="gallery" className="gallery-img" />
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