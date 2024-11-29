import { Badge } from "../../ui/badge";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

const MOVEMENT_SPEED = 1;

interface PositionControlsProps {
  target: HTMLElement;
  setStyle: React.Dispatch<React.SetStateAction<CSSStyleDeclaration>>;
}

const PositionControls: React.FC<PositionControlsProps> = ({
  target,
  setStyle,
}) => {
  const badgeClass =
    "bg-slate-900 text-white p-1 cursor-pointer hover:bg-slate-700";

  return (
    <div className="flex gap-x-1 items-center justify-start">
      <small className="me-2 font-medium">Position</small>
      <Badge
        onClick={() => {
          const currentLeft = Number(target.style.left.replace("px", ""));

          target.style.position = "relative";
          target.style.left = `${currentLeft - MOVEMENT_SPEED}px`;
          setStyle({ ...target.style });
        }}
        className={badgeClass}
      >
        <ArrowLeft size={15} />
      </Badge>
      <Badge
        className={badgeClass}
        onClick={() => {
          const currentLeft = Number(target.style.left.replace("px", ""));
          target.style.position = "relative";
          target.style.left = `${currentLeft + MOVEMENT_SPEED}px`;
          setStyle({ ...target.style });
        }}
      >
        <ArrowRight size={15} />
      </Badge>
      <Badge
        className={badgeClass}
        onClick={() => {
          const currentTop = Number(target.style.top.replace("px", ""));
          target.style.position = "relative";
          target.style.top = `${currentTop - MOVEMENT_SPEED}px`;
          setStyle({ ...target.style });
        }}
      >
        <ArrowUp size={15} />
      </Badge>
      <Badge
        className={badgeClass}
        onClick={() => {
          const currentTop = Number(target.style.top.replace("px", ""));
          target.style.position = "relative";
          target.style.top = `${currentTop + MOVEMENT_SPEED}px`;
          setStyle({ ...target.style });
        }}
      >
        <ArrowDown size={15} />
      </Badge>
    </div>
  );
};

export default PositionControls;
