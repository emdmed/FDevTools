import { useState, ReactNode, useEffect, useRef, memo } from "react";
import ContextMenu from "./components/contextMenu/contextMenu";
import "./styles.css"

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
      setIsGrid(true);
    }
  }, [contextMenu.visible]);

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
