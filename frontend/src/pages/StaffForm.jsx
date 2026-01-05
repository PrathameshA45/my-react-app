import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessToast from "./SuccessToast";

const API_URL = import.meta.env.VITE_API_URL;

export default function StaffForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .test(
        "valid-name",
        "Name must contain at least 3 alphabetic characters",
        (value) => {
          if (!value) return false;
          if (!/^[A-Za-z ]+$/.test(value)) return false;
          return value.replace(/[^A-Za-z]/g, "").length >= 3;
        }
      )
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .matches(/@gmail\.com$/, "Email must end with @gmail.com")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[7-9][0-9]{9}$/, "Mobile must start with 7-9 and be 10 digits")
      .required("Mobile number is required"),

    photo: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      photo: null,
    },
    validationSchema,

    onSubmit: async (values) => {
      setServerError("");
      setSuccessMsg("");

      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/${id}` : API_URL;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      if (values.photo) formData.append("photo", values.photo);

      try {
        const res = await fetch(url, { method, body: formData });
        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error || "Server validation failed");
          return;
        }

        setSuccessMsg(id ? "Staff updated successfully" : "Staff added successfully");

        setTimeout(() => {
          navigate("/staff", { state: { refresh: true } });
        }, 2000);
      } catch {
        setServerError("Server error occurred");
      }
    },
  });

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        formik.setValues({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          photo: null,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      {successMsg && <SuccessToast message={successMsg} onClose={() => setSuccessMsg("")} />}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            {id ? "Edit Staff" : "Add Staff"}
          </h2>

          {serverError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {serverError}
            </div>
          )}

          {["name", "email", "mobile"].map((field) => (
            <div key={field} className="mb-4">
              <input
                name={field}
                placeholder={field.toUpperCase()}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-2 rounded border ${
                  formik.touched[field] && formik.errors[field]
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-500 text-xs mt-1">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => formik.setFieldValue("photo", e.target.files[0])}
            className="mb-4"
          />

          {formik.values.photo && (
            <img
              src={URL.createObjectURL(formik.values.photo)}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate("/staff")}>
              Cancel
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
