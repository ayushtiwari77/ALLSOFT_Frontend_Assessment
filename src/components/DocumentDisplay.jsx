import { useUserStore } from "../store/useUserStore";
import { useState } from "react";
import toast from "react-hot-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DocumentDisplay = () => {
  const { searchedResults } = useUserStore();
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

  const handleDownload = (document) => {
    const { file_url } = document;
    const fileName = getFileName(file_url);

    // creating and invisible <a> tag and clicks it to trigger download
    const link = document.createElment("a");
    link.href = file_url;

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (document.length === 0) {
      toast("No files to download");
      return;
    }

    try {
      const zip = new JSZip();
      const fetchPromises = DocumentDisplay.map(async (doc) => {
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

  return (
    <div className=" min-h-[500px] my-7 w-full max-w-[95vw] rounded-lg shadow-xl p-4">
      {/* download all button */}
    </div>
  );
};

export default DocumentDisplay;
