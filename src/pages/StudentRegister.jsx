// src/components/StudentRegister/StudentRegister.jsx
import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./StudentRegister.css";

export default function StudentRegister({ onClose }) {
  const navigate = useNavigate();

const steps = [
  {
    title: "Your Name",
    fields: [
      { name: "first_name", label: "First Name", type: "text", required: true },
      { name: "middle_name", label: "Middle Name", type: "text", required: false },
      { name: "last_name", label: "Last Name", type: "text", required: true },
      {
        name: "student_photo_path",
        label: "Upload Image",
        type: "file",
        required: true,
      },
    ],
  },
  {
    title: "Date of Birth",
    fields: [
      {
        name: "date_of_birth",
        label: "Date of Birth",
        type: "date",
        required: true,
      },
    ],
  },
  {
    title: "Contact Numbers",
    fields: [
      {
        name: "contact_number_1",
        label: "Primary Contact",
        type: "text",
        required: true,
      },
      {
        name: "contact_number_2",
        label: "Alternate Contact",
        type: "text",
        required: false,
      },
    ],
  },
  {
    title: "Education",
    fields: [
      { name: "student_class", label: "Class", type: "text", required: true },
      {
        name: "school_or_college_name",
        label: "School",
        type: "text",
        required: true,
      },
      {
        name: "board_or_university_name",
        label: "Board",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Address",
    fields: [
      { name: "address", label: "Address", type: "textarea", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "district", label: "District", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "pin", label: "PIN Code", type: "text", required: true },
    ],
  },
  {
    title: "Additional Info",
    fields: [
      {
        name: "notes",
        label: "Notes (optional)",
        type: "textarea",
        required: false,
      },
      { name: "email", label: "Email", type: "email", required: true },
    ],
  },
  // Moved from the top down here, so it shows last:
  {
    title: "Terms And Conditions",
    description:
      "1. Fees once paid is non-refundable/adjustable under any circumstances. Fee installments must be paid on or before the due date.\n" +
      "2. Monthly fees should be paid by latest 10th of the month.\n" +
      "3. Disciplinary actions will be taken against students found guilty of disrupting the classroom.\n" +
      "4. Institute management will have full authority to change the terms and conditions without any prior information.\n" +
      "5. Institute reserves the right to publish the photo and name of the successful candidates for portfolio development of the institute.\n",
    fields: [
      {
        name: "conditions",
        label: "I agree with the terms and conditions.",
        type: "checkbox",
        required: true,
      },
      {
        name: "terms",
        type: "checkbox",
        label:
          "I/We, hereby declare that the information given above is the best of knowledge/belief and nothing has been concealed or distorted. If at any stage I am found to have distorted any information or violated institution's Terms & Conditions, the management will have full authority to restrict the admission",
        required: true,
      },
    ],
  },
];


  const allFields = steps.flatMap((s) => s.fields);

  // initialize checkboxes to false
  const [formData, setFormData] = useState(
    allFields.reduce((acc, f) => {
      acc[f.name] = f.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const imageToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleChange = async (e) => {
    const { name, type, files, value, checked } = e.target;

    if (type === "file" && files?.[0]) {
      // your existing image-compression logic
      try {
        const rawBase64 = await imageToBase64(files[0]);
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 200;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let quality = 0.7;
          let compressed = canvas.toDataURL("image/jpeg", quality);
          let blob = await (await fetch(compressed)).blob();
          let sizeKB = blob.size / 1024;

          while (sizeKB > 150 && quality > 0.1) {
            quality -= 0.1;
            compressed = canvas.toDataURL("image/jpeg", quality);
            blob = await (await fetch(compressed)).blob();
            sizeKB = blob.size / 1024;
          }

          setFormData((prev) => ({ ...prev, [name]: compressed }));
          showToast("Image uploaded and compressed", "success");
        };
        img.src = rawBase64;
      } catch (err) {
        console.error("Image upload error", err);
        showToast("Failed to upload image", "danger");
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    for (let f of steps[currentStep].fields) {
      const val = formData[f.name];
      if (f.required && (val === "" || val === false)) {
        return showToast(`${f.label} is required.`, "danger");
      }
    }
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  const handleRegisterSubmit = async () => {
    for (let f of allFields) {
      const val = formData[f.name];
      if (f.required && (val === "" || val === false)) {
        return showToast(`${f.label} is required.`, "danger");
      }
    }
    try {
      await api.post("student/register/", formData);
      showToast("Registered successfully! Please enter OTP.", "success");
      setShowOtpModal(true);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Registration failed.", "danger");
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim()) return showToast("OTP is required.", "danger");
    try {
      await api.post("student/otpverify/", { email: formData.email, otp });
      showToast("OTP Verified! 🎉", "success");
      setShowOtpModal(false);
      onClose();
    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.student_username?.[0] || "OTP verification failed.",
        "danger"
      );
    }
  };

  const promptExit = () => setShowConfirmExit(true);
  const confirmExit = (yes) => {
    setShowConfirmExit(false);
    if (yes) onClose();
  };

  const { title, description, fields } = steps[currentStep];

  return (
    <>
      <div className="sr-overlay" onClick={promptExit} />

      <div className="sr-modal">
        <div className="sr-header">
          <h5>Student Registration</h5>
          <button className="sr-close" onClick={promptExit}>
            ×
          </button>
        </div>
        <div className="sr-body">
          <h6 className="sr-step-title">{title}</h6>
          {description && (
            <p
              className="sr-step-description"
              dangerouslySetInnerHTML={{
                __html: description.replace(/\n/g, "<br>"),
              }}
            />
          )}

          {fields.length > 1 ? (
            <div className="sr-row">
              {fields.map((f) => (
                <div
                  key={f.name}
                  className={fields.length === 2 ? "sr-col-6" : "sr-col-4"}
                >
                  {f.type === "checkbox" ? (
                    <label>
                      <input
                        type="checkbox"
                        name={f.name}
                        checked={formData[f.name]}
                        onChange={handleChange}
                      />
                      {f.label}
                    </label>
                  ) : f.type === "textarea" ? (
                    <>
                      <label>{f.label}</label>
                      <textarea
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                      />
                    </>
                  ) : f.type === "file" ? (
                    <>
                      <label>{f.label}</label>
                      <input
                        type="file"
                        accept="image/*"
                        name={f.name}
                        onChange={handleChange}
                      />
                      {formData[f.name] && (
                        <img
                          src={formData[f.name]}
                          alt="Preview"
                          className="sr-img-preview"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <label>{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <input
              type={fields[0].type}
              name={fields[0].name}
              placeholder={fields[0].label}
              value={formData[fields[0].name]}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="sr-footer">
          {currentStep > 0 && (
            <button className="btn-back" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button className="btn-next" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn-submit" onClick={handleRegisterSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>

      {toast.show && (
        <div className={`sr-toast sr-${toast.type}`}>{toast.message}</div>
      )}

      {showOtpModal && (
        <>
          <div className="sr-otp-overlay" />
          <div className="sr-otp-modal">
            <div className="sr-header">
              <h5>Enter OTP</h5>
              <button
                className="sr-close"
                onClick={() => setShowOtpModal(false)}
              >
                ×
              </button>
            </div>
            <div className="sr-body">
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="sr-footer">
              <button
                className="btn-back"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
              <button className="btn-next" onClick={handleOtpSubmit}>
                Verify
              </button>
            </div>
          </div>
        </>
      )}

      {showConfirmExit && (
        <>
          <div className="sr-overlay" />
          <div className="sr-otp-modal">
            <div className="sr-header">
              <h5>Quit Registration?</h5>
            </div>
            <div className="sr-body">
              <p>All entered data will be lost. Are you sure?</p>
            </div>
            <div className="sr-footer">
              <button className="btn-back" onClick={() => confirmExit(false)}>
                No, Go Back
              </button>
              <button className="btn-submit" onClick={() => confirmExit(true)}>
                Yes, Quit
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
