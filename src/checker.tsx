import { useState, ReactNode, useEffect, useRef, memo } from "react";
import ContextMenu from "./components/contextMenu/contextMenu";
import "./styles.css";

interface ContextMenuState {
  visible: boolean;
  event: {
    clientX: number;
    clientY: number;
    completeEvent: MouseEvent | null;
  };
}

interface CheckerProps {
  children: ReactNode;
}

const Checker: React.FC<CheckerProps> = ({ children }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    event: {
      clientX: 0,
      clientY: 0,
      completeEvent: null,
    },
  });
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
  });
  const observerRef = useRef<ResizeObserver | null>(null);
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

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    e.preventDefault();
    if (e.ctrlKey) {
      setContextMenu({
        visible: true,
        event: {
          clientX: e.clientX,
          clientY: e.clientY,
          completeEvent: e.nativeEvent,
        },
      });

      if (observerRef.current) observerRef.current.disconnect();

      const observer = new ResizeObserver(() => {
        const rect = target.getBoundingClientRect(); // Get position and size
        setDimensions({
          width: rect.width,
          height: rect.height,
          x: rect.x,
          y: rect.y,
          top: rect.top,
          left: rect.left,
        });
      });

      observer.observe(target);
      observerRef.current = observer;
    }
  };

  useEffect(() => {
    if (!contextMenu.visible) {
      setIsGrid(false);
    } else {
      setIsGrid(false);
    }
  }, [contextMenu.visible]);

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

  const targetPosition = contextMenu.event.completeEvent
    ? (
        contextMenu.event.completeEvent.target as HTMLElement
      )?.getBoundingClientRect()
    : null;

  return (
    <div onContextMenu={onContextMenu}>
      {isGrid && targetPosition && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
          }}
        >
          <div
            className="fdevtools-grid-vertical"
            style={{
              width: dimensions.width,
              left: dimensions.left,
              pointerEvents: "none",
            }}
          ></div>
          <div
            className="fdevtools-grid-horizontal"
            style={{
              height: dimensions.height,
              top: dimensions.top,
              pointerEvents: "none",
            }}
          ></div>
        </div>
      )}
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
          className="border-2 border-cyan-500"
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
      {contextMenu.visible && (
        <ContextMenu
          setIsGrid={setIsGrid}
          setContextMenu={setContextMenu}
          contextMenu={contextMenu}
        />
      )}
      {children}
    </div>
  );
};

export default Checker;
