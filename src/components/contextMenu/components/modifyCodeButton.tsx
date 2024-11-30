import { Badge } from "../../ui/badge";
import { TerminalSquare } from "lucide-react";
import { elementToObject } from "@/helpers/elementToObject";

interface ModifyCodeButtonPops {
  target: HTMLElement;
}

const ModifyCodeButton: React.FC<ModifyCodeButtonPops> = ({ target }) => {
  const onClick = () => {
    sendTargetToBackend(target);
  };

  const sendTargetToBackend = async (target: HTMLElement) => {
    const parsedTarget = elementToObject(target);

    const payload = {
      parsedTarget,
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
