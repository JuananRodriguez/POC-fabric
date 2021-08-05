import { fabric } from "fabric";
import React, { useEffect, useRef, useState } from "react";
const canvasId = "canvas__id";

// flip img
// set("flipX", true);

export const Fabric = ({ imageUrl }) => {
  const [history, setHistory] = useState([]);
  const canvas = useRef(null);
  const mainImage = useRef(null);

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasId, {
      height: 600,
      width: 600,
      backgroundColor: "grey",
    });
  }, []);

  useEffect(() => {
    if (canvas.current && imageUrl) {
      fabric.Image.fromURL(
        imageUrl,
        function (oImg) {
          oImg.left = 300;
          oImg.top = 300;
          oImg.originX = "center";
          oImg.originY = "center";
          oImg.scaleToHeight(600);
          oImg.scaleToWidth(600);
          mainImage.current = oImg;
          canvas.current.add(oImg);
          setHistory((history) => [...history, canvas.current.toJSON()]);
        }
        // { crossOrigin: "anonymous" }
      );
    }
  }, [imageUrl]);

  // TODO: desisto... no funciona
  const handleUndo = () => {
    const newHistory = [...history];
    const lastWork = newHistory.pop();
    if (lastWork) {
      setHistory(newHistory);
      canvas.current = canvas.current.loadFromJSON(lastWork, () =>
        canvas.current.renderAll()
      );
    }
  };

  const toggleFlipX = () => {
    mainImage.current.set("flipX", !mainImage.current.flipX);
    canvas.current.renderAll();

    console.log(canvas.current.toJSON());

    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const toggleFlipY = () => {
    mainImage.current.set("flipY", !mainImage.current.flipY);
    canvas.current.renderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const handleRotationRight = () => {
    let newAngle = mainImage.current.angle + 90;
    newAngle = newAngle >= 360 ? 0 : newAngle;
    mainImage.current.set("angle", newAngle);
    canvas.current.renderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const handleRotationLeft = () => {
    let newAngle = mainImage.current.angle - 90;
    newAngle = newAngle < 0 ? 270 : newAngle;
    mainImage.current.set("angle", newAngle);
    canvas.current.renderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const handleContrastPlus = () => {
    var filter = new fabric.Image.filters.Contrast({ contrast: 0.05 });
    mainImage.current.filters.push(filter);
    mainImage.current.applyFilters();
    canvas.current.requestRenderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const handleContrastLess = () => {
    var filter = new fabric.Image.filters.Contrast({ contrast: -0.05 });
    mainImage.current.filters.push(filter);
    mainImage.current.applyFilters();
    canvas.current.requestRenderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const handleBrightnessPlus = () => {
    var filter = new fabric.Image.filters.Brightness({ brightness: 0.05 });
    mainImage.current.filters.push(filter);
    mainImage.current.applyFilters();
    canvas.current.requestRenderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  const handleBrightnessLess = () => {
    var filter = new fabric.Image.filters.Brightness({ brightness: -0.05 });
    mainImage.current.filters.push(filter);
    mainImage.current.applyFilters();
    canvas.current.requestRenderAll();
    setHistory((history) => [...history, canvas.current.toJSON()]);
  };

  console.log(history);

  return (
    <div>
      <h1>POC fabric.js</h1>
      <div style={{ display: "flex" }}>
        <button onClick={handleUndo} disabled={history.length <= 1}>
          undo
        </button>
        <button onClick={toggleFlipX}>flipX</button>
        <button onClick={toggleFlipY}>flipY</button>
        <button onClick={handleRotationRight}>Turn Right</button>
        <button onClick={handleRotationLeft}>Turn Left</button>
        <button onClick={handleContrastPlus}>Contrast +</button>
        <button onClick={handleContrastLess}>Contrast -</button>
        <button onClick={handleBrightnessPlus}>Brightness +</button>
        <button onClick={handleBrightnessLess}>Brightness -</button>
      </div>
      <canvas id={canvasId} style={{ marginTop: "2rem" }} />
    </div>
  );
};
