import { Badge } from "../../ui/badge";
import { TerminalSquare } from "lucide-react";
import { elementToObject } from "@/helpers/elementToObject";

interface ModifyCodeButtonPops {
  target: HTMLElement;
  originalTarget: HTMLElement
}

const ModifyCodeButton: React.FC<ModifyCodeButtonPops> = ({ target, originalTarget }) => {
  const onClick = () => {
    sendTargetToBackend(originalTarget, target);
  };

  const sendTargetToBackend = async (originalTarget: HTMLElement, target: HTMLElement, ) => {
    const parsedOriginalTarget = elementToObject(originalTarget);
    const parsedNewTarget = elementToObject(target)

    const payload = {
      parsedOriginalTarget,
      parsedNewTarget
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
      className="mx-2 border-0 cursor-pointer p-1 bg-cyan-700 text-white"
      onClick={onClick}
    >
      <TerminalSquare size={15} />
    </Badge>
  );
};

export default ModifyCodeButton;
