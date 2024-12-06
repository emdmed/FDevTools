import { useEffect, useRef, useState } from "react";
import PositionDialog from "./components/positionDialog";
import PositionControls from "./components/positionControls";
import CloseContextMenuButton from "./components/closeContextMenuButton";
import ToggleGridButton from "./components/toggleGridButton";
import ColorSelectors from "./components/colorSelectors";
import ClassChecker from "./components/classChecker";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import InnerHTMLEditor from "./components/innerHTMLEditor";
import IdChecker from "./components/idChecker";
import "../../styles.css";
import { TerminalSquare } from "lucide-react";
import { Badge } from "../ui/badge";
import ModifyCodeButton from "./components/modifyCodeButton";

interface ContextMenuProps {
  contextMenu: {
    visible: boolean;
    event: {
      clientX: number;
      clientY: number;
      completeEvent: MouseEvent | null;
    };
  };
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      event: {
        clientX: number;
        clientY: number;
        completeEvent: MouseEvent | null;
      };
    }>
  >;
  setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  setContextMenu,
  setIsGrid,
}) => {

  const target = contextMenu.event.completeEvent?.target as HTMLElement;
  const originalTarget = target.cloneNode(true) as HTMLElement;
  const [classes, setClasses] = useState([...target.classList]);

  const [innerHTMLValue, setInnerHTMLValue] = useState<string>(
    target.innerHTML
  );
  /*   const [style, setStyle] = useState<CSSStyleDeclaration>(target.style);
  const [boundingClient] = useState<DOMRect>(target.getBoundingClientRect()); */
  const contextMenuRef = useRef(null);

  useEffect(() => {
    target.innerHTML = innerHTMLValue;
  }, [innerHTMLValue]);

  useEffect(() => {
    setInnerHTMLValue(target.innerHTML);
  }, [target]);

  useEffect(() => {
    const adjustPosition = () => {
      const card = contextMenuRef.current as HTMLElement | null;
      if (!card || !contextMenu) return;

      const rect = card.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let adjustedTop = contextMenu.event.clientY + 25;
      let adjustedLeft = contextMenu.event.clientX + 25;

      if (rect.height + adjustedTop > windowHeight) {
        adjustedTop = windowHeight - rect.height - 10;
      }
      if (rect.width + adjustedLeft > windowWidth) {
        adjustedLeft = windowWidth - rect.width - 10;
      }

      card.style.top = `${adjustedTop}px`;
      card.style.left = `${adjustedLeft}px`;
    };

    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => window.removeEventListener("resize", adjustPosition);
  }, [contextMenu]);

  if (!contextMenu.event) {
    return null;
  }

  return (
    <Card
      ref={contextMenuRef}
      className="w-[380px] shadow-md border-slate-900 bg-slate-50"
      style={{
        position: "absolute",
        top: contextMenu?.event.clientY + 25,
        left: contextMenu?.event.clientX + 25,
        zIndex: 99999,
        transition: "top 0.2s, left 0.2s",
      }}
    >
      <CardHeader className="p-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="me-2">{`<${target.localName}>`}</span>
            <ModifyCodeButton classes={classes} target={target} originalTarget={originalTarget} />
          </div>
          <div className="flex items-center">
            <ToggleGridButton setIsGrid={setIsGrid} />
            <CloseContextMenuButton
              setContextMenu={setContextMenu}
              contextMenu={contextMenu}
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 pb-2">
        <ClassChecker classes={classes} setClasses={setClasses} target={target} />
        {target?.id && <IdChecker target={target} />}
      </CardContent>
    </Card>
  );
};

export default ContextMenu;
