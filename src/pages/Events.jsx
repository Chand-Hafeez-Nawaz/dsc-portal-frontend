import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import "./Events.css";
import Loader from "../components/Loader";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://dsc-portal-backend-5eaw.onrender.com";

  useEffect(() => {
  axios
    .get(`${API_URL}/api/events`)
    .then((res) => {
      setEvents(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="events-page">
      <h2 className="events-title">All Events</h2>

      {loading ? (
  <Loader />
) : (
  <div className="events-grid">
    {events.length === 0 ? (
      <p>No events available</p>
    ) : (
      events.map((event) => (
        <div
          key={event._id}
          className="event-card"
          data-aos="zoom-in"
          onClick={() => setSelectedEvent(event)}
        >
          <h3>{event.title}</h3>
          <p className="event-short">
            {event.description.length > 100
            ? event.description.substring(0, 100) + "..."
            : event.description}
          </p>
          <p className="event-date">
            {new Date(event.date).toLocaleDateString()}
          </p>
          
        </div>
      ))
    )}
  </div>
)}

      {/* 🔥 POPUP MODAL */}
      {selectedEvent && (
        <div
          className="event-modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="event-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close-btn"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </span>

            <h2>{selectedEvent.title}</h2>

            <p className="modal-date">
              {new Date(selectedEvent.date).toLocaleDateString()}
            </p>

            <p className="modal-description">
              {selectedEvent.description}
            </p>

          {selectedEvent?.brochure && (
  <a
    href={`https://docs.google.com/gview?url=${encodeURIComponent(selectedEvent.brochure)}&embedded=true`}
    target="_blank"
    rel="noopener noreferrer"
    className="brochure-btn"
  >
    Open Brochure
  </a>
)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;