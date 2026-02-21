import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await api.get("/api/notices");
    setNotices(res.data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Notice Board</h2>

      {notices.map((notice) => (
        <div key={notice._id} style={{ marginBottom: "20px" }}>
          <h4>{notice.title}</h4>

          <a
            href={notice.document}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Circular
          </a>
        </div>
      ))}
    </div>
  );
}

export default NoticeBoard;