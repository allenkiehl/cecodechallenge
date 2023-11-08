import React, { useState, useLayoutEffect } from "react";
import Header from "./components/Header";
import { CommunityColors } from "./data/sampleData";
import swal from "sweetalert";

const ExploreColors = () => {
  const exploreColors = CommunityColors;

  const [colors, setColors] = useState([]);

  useLayoutEffect(() => {
    const getColors = JSON.parse(localStorage.getItem("colorsDB"));
    setColors(getColors);
  }, []);

  const addColorToFavorties = (description, color) => {
    const newColor = { id: (colors.length + 1).toString(), description, color };
    const newColorList = JSON.stringify([...colors, newColor]);
    setColors([...colors, newColor]);
    localStorage.setItem("colorsDB", newColorList);
    swal({
      text: "Color added to your favorites!",
      button: "Thanks",
    });
  };

  return (
    <div className="h-full">
      <Header />
      <div className="h-[calc(100vh-65px)]">
        <div className="h-full w-full">
          <div className="grid grid-cols-4 gap-4 p-4">
            {exploreColors.map((color) => (
              <div
                key={color.id}
                className="rounded h-40 text-center flex items-center justify-center flex-col"
                style={{ backgroundColor: color.color }}
              >
                <div className="w-full">{color.color}</div>
                <div className="mt-3 w-full">{color.description}</div>
                <div>
                  <button
                    onClick={() =>
                      addColorToFavorties(color.description, color.color)
                    }
                    className="mt-3 rounded-md bg-white float-right px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <i className="fa-light fa-heart"></i> Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreColors;
