import React, { useState } from "react";
import axios from "../utils/axios";
import { useUserStore } from "../store/useUserStore";

// define filter options

const majorHeads = [
  { value: "personal", label: "Personal" },
  { value: "professional", label: "Professional" },
];

const minorHeads = [
  { value: "IT", label: "IT" },
  { value: "HR", label: "HR" },
  { value: "ACCOUNTS", label: "Accounts" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

//initial search state

const initialSearchState = {
  major_head: "", // 'personal' or 'professional'
  minor_head: "",
  from_date: "",
  to_date: "",
};

const SearchBar = () => {
  const [formData, setFormData] = useState(initialSearchState);
  const { token } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  //handling form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
        {/*here icon*/} Document Search Filter
      </h2>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Major Head Dropdown */}
          <div className="col-span-1">
            <label
              htmlFor="major_head"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              **Major Head**
            </label>
            <select
              id="major_head"
              name="major_head"
              value={formData.major_head}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm border"
            >
              <option value="">-- Select Major Head --</option>
              {majorHeads.map((head) => (
                <option key={head.value} value={head.value}>
                  {head.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minor Head Dropdown (Unified) */}
          <div className="col-span-1">
            <label
              htmlFor="minor_head"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              **Minor Head**
            </label>
            <select
              id="minor_head"
              name="minor_head"
              value={formData.minor_head}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm border"
            >
              <option value="">-- Select Minor Head (Optional) --</option>
              {minorHeads.map((head) => (
                <option key={head.value} value={head.value}>
                  {head.label}
                </option>
              ))}
            </select>
          </div>

          {/* From Date Input */}
          <div className="col-span-1">
            <label
              htmlFor="from_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              **From Date**
            </label>
            <input
              type="date"
              id="from_date"
              name="from_date"
              value={formData.from_date}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* To Date Input */}
          <div className="col-span-1">
            <label
              htmlFor="to_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              **To Date**
            </label>
            <input
              type="date"
              id="to_date"
              name="to_date"
              value={formData.to_date}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white transition duration-150 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search Documents"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
