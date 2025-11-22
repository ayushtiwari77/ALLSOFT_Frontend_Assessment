import { useUserStore } from "../store/useUserStore";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const majorHeads = [
  { value: "Professional", label: "Professional" },
  { value: "Personal", label: "Personal" },
];

const minorHeadsData = {
  Professional: [
    { value: "Accounts", label: "Accounts" },
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "Finance", label: "Finance" },
  ],
  Personal: [
    { value: "John", label: "John" },
    { value: "Tom", label: "Tom" },
    { value: "Emily", label: "Emily" },
  ],
};

const UploadPage = () => {
  const { user_id, token } = useUserStore();
  const [formData, setFormData] = useState({
    major_head: "",
    minor_head: "",
    document_date: new Date().toISOString().split("T")[0],
    document_remarks: "",
    tags: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  //HandleInputChange

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //reset minor_head when major_head changes
    if (name === "major_head") {
      setFormData((prev) => ({
        ...prev,
        minor_head: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMessage("");

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        setMessage("Error: Only JPEG, PNG, or PDF files are allowed.");
        setFormData((prev) => ({ ...prev, file: null }));
        toast.error(message);
        return;
      }

      setFormData((prev) => ({ ...prev, file: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file || !formData.major_head || !formData.minor_head) {
      setMessage("Please fill all required fields and select a file.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      //preparing the data object
      const dataPayload = {
        major_head: formData.major_head,
        minor_head: formData.minor_head,
        document_date: formData.document_date,
        document_remarks: formData.document_remarks,
        user_id: user_id || "Ayush",

        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag) // Remove empty tags
          .map((tag) => ({ tag_name: tag })),
      };

      //creating form data

      const form = new FormData();
      form.append("file", formData.file);

      form.append("data", JSON.stringify(dataPayload));

      const response = await axios.post("/saveDocumentEntry", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      toast.success("Document uploaded Successfully");
      setMessage("Document uploaded succesfully");
      setFormData({
        major_head: "",
        minor_head: "",
        document_date: new Date().toISOString().split("T")[0], // Default to today
        document_remarks: "",
        tags: "",
        file: null,
      });
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage(
        `Upload failed: ${error.response?.data?.message || "Server error"}`
      );
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  //dynamic dropdown logic
  const minorHeadOptions = formData.major_head
    ? minorHeadsData[formData.major_head]
    : [];

  return (
    <main className="min-h-screen w-screen bg-blue-300 ">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Document Upload
        </h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded ${
              message.includes("Error") || message.includes("failed")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/*  Major Head Dropdown */}
          <div>
            <label
              htmlFor="major_head"
              className="block text-sm font-medium text-gray-700"
            >
              Major Head *
            </label>
            <select
              id="major_head"
              name="major_head"
              value={formData.major_head}
              onChange={handleInputChange}
              required
              className="mt-1 block  pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm  disabled:bg-gray-50 disabled:cursor-not-allowed  w-full pl-3   border  rounded-md shadow-sm "
            >
              <option value="">Select Major Head</option>
              {majorHeads.map((head) => (
                <option key={head.value} value={head.value}>
                  {head.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minor Head Dynamic Dropdown */}
          <div>
            <label
              htmlFor="minor_head"
              className="block text-sm font-medium text-gray-700"
            >
              {formData.major_head === "Personal" ? "Name" : "Department"} *
            </label>
            <select
              id="minor_head"
              name="minor_head"
              value={formData.minor_head}
              onChange={handleInputChange}
              required
              disabled={!formData.major_head}
              className="mt-1 block  pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm  disabled:bg-gray-50 disabled:cursor-not-allowed  w-full pl-3   border  rounded-md shadow-sm   "
            >
              <option value="">
                Select {formData.major_head ? "Minor Head" : "Major Head first"}
              </option>
              {minorHeadOptions.map((head) => (
                <option key={head.value} value={head.value}>
                  {head.label}
                </option>
              ))}
            </select>
          </div>

          {/* Document Date */}
          <div>
            <label
              htmlFor="document_date"
              className="block text-sm font-medium text-gray-700"
            >
              Document Date
            </label>
            <input
              type="date"
              id="document_date"
              name="document_date"
              value={formData.document_date}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/*  Remarks Text Field */}
          <div>
            <label
              htmlFor="document_remarks"
              className="block text-sm font-medium text-gray-700"
            >
              Remarks
            </label>
            <textarea
              id="document_remarks"
              name="document_remarks"
              rows="3"
              value={formData.document_remarks}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Tags Field  */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="e.g., invoice, 2024, urgent"
              value={formData.tags}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Select Document (Image/PDF Only)*
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
              accept="image/jpeg, image/png, application/pdf"
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {isLoading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default UploadPage;
