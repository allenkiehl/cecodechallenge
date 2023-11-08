import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import ColorPanel from "./components/ColorPanel";
import Header from "./components/Header";

import { InitialColors, CommunityColors } from "./data/sampleData";

const App = () => {
  const [colors, setColors] = useState([]);

  useLayoutEffect(() => {
    const getColors = JSON.parse(localStorage.getItem("colorsDB"));
    if (!getColors) {
      localStorage.setItem("colorsDB", JSON.stringify(InitialColors));
      setColors(InitialColors);
    } else {
      const myColors = JSON.parse(localStorage.getItem("colorsDB"));
      setColors(myColors);
    }
  }, []);

  const addColor = () => {
    const randomColor =
      CommunityColors[Math.floor(Math.random() * CommunityColors.length)];
    let description = randomColor.description;
    let color = randomColor.color;
    const newColor = { id: (colors.length + 1).toString(), description, color };
    const newColorList = JSON.stringify([...colors, newColor]);
    setColors([...colors, newColor]);
    localStorage.setItem("colorsDB", newColorList);
  };

  return (
    <>
      <div className="h-full">
        <Header />
        <div className="h-[calc(100vh-65px)]">
          <div className="h-full w-[calc(100%-65px)] inline-block">
            <ColorPanel colors={colors} setColors={setColors} />
          </div>

          <div
            className="bg-white h-full float-right flex items-center justify-center"
            style={{ width: 65 }}
          >
            <button
              type="button"
              onClick={() => addColor()}
              className="p-0 w-10 h-10 bg-ce rounded-full hover:bg-ce-darkOrange active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            >
              <i className="fa-solid fa-plus text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
