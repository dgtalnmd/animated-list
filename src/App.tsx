import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addElement, removeElement } from "./elementsSlice";
import { RootState, AppDispatch } from "./store";
import "./App.css";
import { getRandomColor } from "./utils";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const elements = useSelector((state: RootState) => state.elements.elements);
  const listRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    const newElement = {
      id: Date.now(),
      color: getRandomColor(),
    };
    dispatch(addElement(newElement));
  };

  const removedId = useRef<number | null>(null);
  const handleRemove = () => {
    let index: number = -1;

    if (removedId.current !== null) {
      index =
        elements.findIndex((element) => element.id === removedId.current) - 1;
    }
    if (index < 0) {
      index = elements.length - 1;
    }

    const id = elements[index]?.id;

    if (
      id &&
      id !== removedId.current &&
      listRef.current &&
      listRef.current.children[index]
    ) {
      const element = listRef.current.children[index] as HTMLElement;

      element.style.transform = `translateX(${
        (Number(element.style.transform.match(/\d+/)?.[0]) || 0) + 100
      }%)`;
      element.style.opacity = "0";

      removedId.current = id;

      setTimeout(() => {
        dispatch(removeElement(id));
      }, 500);
    }
  };

  const prevElementsLength = useRef(elements.length);
  useEffect(() => {
    if (
      elements.length > prevElementsLength.current &&
      listRef.current &&
      listRef.current.firstChild
    ) {
      const firstElement = listRef.current.firstChild as HTMLElement;

      requestAnimationFrame(() => {
        firstElement.classList.add("Animation");
      });
    }

    return () => {
      prevElementsLength.current = elements.length;
    };
  }, [elements]);

  return (
    <div className="App">
      <div className="Actions">
        <button onClick={handleAdd}>Добавить</button>
        <button onClick={handleRemove}>Удалить</button>
      </div>
      <div className="List" ref={listRef}>
        {elements.map((element, index) => (
          <div
            key={element.id}
            className={`Element ${index === 0 ? "First" : ""}`}
            style={{
              backgroundColor: element.color,
              transform:
                index !== 0 ? `translateX(${100 * index}%)` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
