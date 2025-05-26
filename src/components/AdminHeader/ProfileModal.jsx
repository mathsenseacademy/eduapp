import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfileModal.css";

export default function ProfileModal({
  show,
  onClose,
  onLogout,
  user,
  anchor, // { top, left } from header
}) {
  const [preview, setPreview] = useState(user.avatar);
  const [pwd, setPwd] = useState({ current: "", new: "", confirm: "" });
  const fileInput = useRef(null);

  /* ---------- avatar change ---------- */
  const onSelectImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    // TODO: upload to server here
  };

  /* ---------- password submit ---------- */
  const onPasswordSubmit = (e) => {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      alert("Passwords do not match");
      return;
    }
    // TODO: API call
    alert("Password changed!");
    setPwd({ current: "", new: "", confirm: "" });
  };

  /* ---------- close on ESC ---------- */
  useEffect(() => {
    if (!show) return;
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [show, onClose]);

  /* ---------- render ---------- */
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* backdrop */}
          <motion.div
            className="profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            className="profile-modal"
            style={{ top: anchor.top, left: anchor.left }}
            initial={{ scale: 0.8, opacity: 0, x: "-100%" }}
            animate={{ scale: 1, opacity: 1, x: "-100%" }} // right-aligned
            exit={{ scale: 0.8, opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>
              ×
            </button>

            {/* -------- profile header -------- */}
            <div className="profile-header">
              <img
                src={preview}
                alt="avatar"
                className="profile-avatar"
                title="Click to change"
                onClick={() => fileInput.current.click()}
              />
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                hidden
                onChange={onSelectImg}
              />

              <h3>{user.name}</h3>

              {/* NEW username line */}
              {user.username && (
                <p className="username">@{user.username}</p>
              )}

              <p>{user.email}</p>
            </div>

            <hr />

            {/* -------- change password -------- */}
            <form className="pwd-form" onSubmit={onPasswordSubmit}>
              <h4>Change Password</h4>
              <input
                type="password"
                placeholder="Current password"
                value={pwd.current}
                onChange={(e) =>
                  setPwd({ ...pwd, current: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="New password"
                value={pwd.new}
                onChange={(e) =>
                  setPwd({ ...pwd, new: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={pwd.confirm}
                onChange={(e) =>
                  setPwd({ ...pwd, confirm: e.target.value })
                }
                required
              />
              <button type="submit" className="save-btn">
                Save
              </button>
            </form>

            <hr style={{ margin: "1rem 0" }} />

            <button onClick={onLogout} className="logout-btn-full">
              Logout
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
