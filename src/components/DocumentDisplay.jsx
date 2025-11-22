import { useUserStore } from "../store/useUserStore";
import { useState } from "react";
import toast from "react-hot-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const getFileIcon = (fileUrl) => {
  const extension = fileUrl.split(".").pop().split("?")[0].toLowerCase();
  switch (extension) {
    case "pdf":
      return "📄"; // PDF icon
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "🖼️"; // Image icon
    default:
      return "📁"; // General file icon
  }
};

const DocumentDisplay = () => {
  const { searchedResults: documents } = useUserStore();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState({
    type: "",
    url: "",
    name: "",
  });

  const getFileExtension = (url) => {
    return url.split(".").pop().split("?")[0].toLowerCase();
  };

  const isPreviewSupported = (url) => {
    const extension = getFileExtension(url);
    return ["jpg", "jpeg", "png", "pdf"].includes(extension);
  };

  const getFileName = (url) => {
    try {
      const path = new URL(url).pathname;
      const parts = path.split("/");

      return parts[parts.length - 1];
    } catch (e) {
      console.error("Invalid URL for file name extraction:", url);
      return "UnknownFile";
    }
  };

  const handlePreview = (document) => {
    const { file_url } = document;
    const fileName = getFileName(file_url);

    if (isPreviewSupported(file_url)) {
      const extension = getFileExtension(file_url);
      const fileType = ["jpg", "jpeg", "png"].includes(extension)
        ? "image"
        : "pdf";

      setPreviewContent({
        type: fileType,
        url: file_url,
        name: fileName,
      });
      setIsPreviewModalOpen(true);
    } else {
      // unsupported file type simulation
      alert(
        `Preview not supported for file type: ${getFileExtension(
          file_url
        )}. Please download the file.`
      );
    }
  };

  const handleDownload = (documentP) => {
    const { file_url } = documentP;
    const fileName = getFileName(file_url);

    // creating and invisible <a> tag and clicks it to trigger download
    const link = document.createElement("a");
    link.href = file_url;

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (documents.length === 0) {
      toast("No files to download");
      return;
    }

    try {
      const zip = new JSZip();
      const fetchPromises = documents.map(async (doc) => {
        const fileName = getFileName(doc.file_url);
        const response = await fetch(doc.file_url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${fileName}: ${response.statusText}`
          );
        }

        const data = await response.blob();
        zip.file(fileName, data);
      });

      await Promise.all(fetchPromises);

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "AllDocuments.zip");
      toast.success("All Files downloaded as AllDocuments.zip");
    } catch (error) {
      console.error("Error downloading all files:", error);
      toast.error(
        "Failed to create or download the ZIP file. See console for details."
      );
    }
  };

  // Render Functions

  const renderDocumentRow = (document) => {
    return (
      <div
        key={document.document_id}
        className="flex justify-between items-center p-4 border-b hover:bg-rose-300 bg-white "
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-blue-700 truncate">
            {getFileIcon(document.file_url)} {getFileName(document.file_url)}
          </p>
          <p className="text-sm text-gray-500">
            **Head:** {document.major_head} / {document.minor_head} | **Uploaded
            By:** {document.uploaded_by}
          </p>
        </div>

        <div className="space-x-2 flex-shrink-0">
          <button
            onClick={() => handlePreview(document)}
            className="bg-purple-500 text-white px-3 py-1 text-sm rounded hover:bg-purple-600 transition"
          >
            Preview
          </button>
          <button
            onClick={() => handleDownload(document)}
            className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition"
          >
            Download
          </button>
        </div>
      </div>
    );
  };

  // render preview modal
  const renderPreviewModal = () => {
    if (!isPreviewModalOpen) return null;
    const { type, url, name } = previewContent;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col shadow-2xl">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold">Preview: {name}</h3>
            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="flex-grow p-4 overflow-hidden">
            {type === "image" ? (
              <img
                src={url}
                alt={name}
                className="max-w-full max-h-full object-contain mx-auto"
              />
            ) : type === "pdf" ? (
              //   iframe to display PDF files
              <iframe
                src={url}
                title={name}
                className="w-full h-full border-0"
              />
            ) : (
              <p className="text-center text-red-500">
                Unsupported file type for preview.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" min-h-[500px] my-7 w-full max-w-[95vw] rounded-lg shadow-xl p-4">
      {/* download all button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleDownloadAll}
          disabled={documents.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          ⬇️ Download All ({documents.length} Files) as ZIP
        </button>
      </div>

      {/* search results */}
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Found Documents</h2>
      <div className="border rounded-lg overflow-hidden">
        {documents.length > 0 ? (
          documents.map(renderDocumentRow)
        ) : (
          <p className="p-4 text-center text-gray-500">
            No search results available.
          </p>
        )}
      </div>

      {/* Preview Modal */}
      {renderPreviewModal()}
    </div>
  );
};

export default DocumentDisplay;
