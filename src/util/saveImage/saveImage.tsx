import html2canvas from "html2canvas";
import React from "react";

const captureData = () => {
  const capture = () => {
    console.log("capture");
    html2canvas(document.getElementById("table")!).then(canvas => {
      saveAs(canvas.toDataURL("image/png"), "time-table.png");
    });
  };

  const saveAs = (uri: string, filename: string) => {
    console.log("save");
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return capture();
};

export default captureData;
