import { Badge } from "../../ui/badge";
import { TerminalSquare } from "lucide-react";
import { elementToObject } from "@/helpers/elementToObject";
import { useState } from "react";

interface ModifyCodeButtonPops {
  target: HTMLElement;
  originalTarget: HTMLElement;
}

const ModifyCodeButton: React.FC<ModifyCodeButtonPops> = ({
  target,
  originalTarget,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [showText, setShowText] = useState(false);

  const onClick = () => {
    sendTargetToBackend(originalTarget, target);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
    // Delay the appearance of the text
    setTimeout(() => {
      setShowText(true);
    }, 400); // Match the duration of the width transition
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setShowText(false); // Hide text immediately on hover exit
  };

  const sendTargetToBackend = async (
    originalTarget: HTMLElement,
    target: HTMLElement
  ) => {
    const parsedOriginalTarget = elementToObject(originalTarget);
    const parsedNewTarget = elementToObject(target);

    const payload = {
      parsedOriginalTarget,
      parsedNewTarget,
    };

    const response = await fetch("http://localhost:1216/modify-element", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(await response.json());
  };

  return (
    <Badge
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="updatecode"
      className={`mx-2 border-0 cursor-pointer p-1 bg-cyan-700 text-white hover:bg-cyan-800 transition-all ease-in-out duration-300 h-[25px] ${
        isHover ? "w-[110px]" : "w-[24px]"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center overflow-hidden">
        <TerminalSquare size={15} />
        {showText && (
          <span
            className={`ml-2 transition-opacity duration-500 ${
              isHover ? "opacity-100" : "opacity-0"
            }`}
          >
            Update code
          </span>
        )}
      </div>
    </Badge>
  );
};

export default ModifyCodeButton;
