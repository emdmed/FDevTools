import { useEffect, useState } from "react";

const Box = () => {
  const [isControlPressed, setIsControlPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [hoveredElement, setHoveredElement] = useState<{
    tagName: string;
    id: string;
    position: any;
  }>({
    tagName: "",
    id: "",
    position: "",
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Control") {
      setIsControlPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Control") {
      setIsControlPressed(false);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (element) {
      setHoveredElement({
        tagName: element.tagName.toLowerCase(), // Tag name of the element
        id: element.id || "(no id)", // ID of the element or fallback if not present
        position: element.getBoundingClientRect(),
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={{ pointerEvents: "none"}}>
      {isControlPressed && (
        <div
          style={{
            position: "absolute",
            top: hoveredElement.position.top - 30,
            bottom: hoveredElement.position.bottom,
            left: hoveredElement.position.left,
            right: hoveredElement.position.right,
          }}
          className="w-[50px] h-[25px] bg-cyan-500 text-white p-2 rounded shadow flex items-center justify-center"
        >
          <small className="font-bold">{`${hoveredElement.tagName}`}</small>
        </div>
      )}
      {hoveredElement.tagName && isControlPressed && (
        <div
          className="outline outline-2 outline-cyan-500 rounded"
          style={{
            position: "absolute",
            top: hoveredElement.position.top,
            bottom: hoveredElement.position.bottom,
            left: hoveredElement.position.left,
            right: hoveredElement.position.right,
            pointerEvents: "none",
            height: hoveredElement.position.height,
            width: hoveredElement.position.width,
          }}
        ></div>
      )}
    </div>
  );
};

export default Box;
