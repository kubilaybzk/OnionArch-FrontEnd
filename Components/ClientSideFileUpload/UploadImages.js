"use client";
// components/FileUpload.js
import React, { useState } from "react";

const UploadImages = () => {
  //Seçilen görseller için state
  const [selectedFile, setSelectedFile] = useState(null);

  //Seçilen görseller değişirse
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  //Yükleme işlemleri
  const handleUpload = async () => {
    if (!selectedFile) alert("Lütfen bir dosya seçin");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${Backend_URL}Products/Upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Dosya başarıyla yüklendi!");
      } else {
        alert("Dosya yükleme sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
    }
  };

  return (
    <div className="w-full flex flex-1 flex-col max-w-xl mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Dosya Yükle</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded-md mb-2"
      />
      {selectedFile && (
        <p className="mb-2">Seçilen dosya: {selectedFile.name}</p>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleUpload}
      >
        Yükle
      </button>
    </div>
  );
};

export default UploadImages;
