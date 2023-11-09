import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditColor from "./EditColor";

const ColorPanel = ({ colors, setColors }) => {
  const [editingColor, setEditingColor] = useState(null);

  let numColors = colors.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    numColors = colors.length;
  }, [colors]);

  const handleEdit = (colorId) => {
    setEditingColor(colorId);
  };

  const saveEdit = (colorId, editedDesription, editedColor) => {
    const updatedColors = colors.map((color) => {
      if (color.id === colorId) {
        return { ...color, description: editedDesription, color: editedColor };
      }
      return color;
    });

    setColors(updatedColors);
    localStorage.setItem("colorsDB", JSON.stringify(updatedColors));
    setEditingColor(null);
  };

  const removeEdit = (colorId) => {
    let updatedColors = colors.filter((colors) => colors.id !== colorId);
    setColors(updatedColors);
    localStorage.setItem("colorsDB", JSON.stringify(updatedColors));
    setEditingColor(null);
  };

  const cancelEdit = () => {
    setEditingColor(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedColors = [...colors];
    const [reorderedColor] = updatedColors.splice(result.source.index, 1);
    updatedColors.splice(result.destination.index, 0, reorderedColor);
    setColors(updatedColors);
    localStorage.setItem("colorsDB", JSON.stringify(updatedColors));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="colors" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={
              "text-center grid grid-flow-col grid-cols-" +
              numColors +
              " h-full"
            }
          >
            {colors.map((color, index) => (
              <Draggable key={index} draggableId={index} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {editingColor === color.id ? (
                      <div className="w-full h-full text-center flex items-center justify-center relative flex-row">
                        <EditColor
                          color={color}
                          saveEdit={saveEdit}
                          cancelEdit={cancelEdit}
                          removeEdit={removeEdit}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full text-center flex items-center justify-center relative"
                        style={{ backgroundColor: color.color }}
                      >
                        <div className="absolute left-2 top-2 bg-white p-1 rounded-full w-8 h-8">
                          #{index + 1}
                        </div>
                        <div className="flex-row">
                          <div className="font-bold uppercase">
                            {color.color}
                          </div>
                          <div className="mt-3">{color.description}</div>
                        </div>
                        <div
                          className="absolute w-fit"
                          style={{
                            bottom: 20,
                          }}
                        >
                          <button onClick={() => handleEdit(color.id)}>
                            <i className="fa-thin fa-pen-to-square"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColorPanel;
