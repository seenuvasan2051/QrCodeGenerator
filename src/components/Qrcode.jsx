import { useState } from "react";

export const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://www.youtube.com/");
  const [qrSize, setQrSize] = useState("150");

  async function generateQr() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.log("Error Generating the the Qr Code : ", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQr() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  }

  return (
    <div className="outer-container">
      <div className="app-container">
        <h1>Qr Code Generator</h1>
        {loading && <p>Please wait its loading...</p>}
        {img && <img src={img} className="qr-image" />}
        <div>
          <label htmlFor="dataInput" className="input-label">
            Data for Qr Code :
          </label>
          <input
            type="text"
            value={qrData}
            id="dataInput"
            placeholder="Enter data for QrCode"
            onChange={(e) => setQrData(e.target.value)}
          />

          <label htmlFor="sizeInput" className="input-label">
            Image size (eg. 150) :
          </label>
          <input
            type="text"
            value={qrSize}
            id="sizeInput"
            placeholder="Enter Iamage Size"
            onChange={(e) => setQrSize(e.target.value)}
          />

          <button
            className="generate-button"
            disabled={loading}
            onClick={generateQr}
          >
            Generate Qr code
          </button>
          <button className="download-button" onClick={downloadQr}>
            Download Qr code
          </button>
        </div>
      </div>
    </div>
  );
};
