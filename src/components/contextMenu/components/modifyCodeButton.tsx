import { Badge } from "../../ui/badge";
import { TerminalSquare } from "lucide-react";
import { elementToObject } from "@/helpers/elementToObject";
import { useEffect, useState } from "react";

interface ModifyCodeButtonPops {
  target: HTMLElement;
  originalTarget: HTMLElement;
}

const ModifyCodeButton: React.FC<ModifyCodeButtonPops> = ({
  target,
  originalTarget,
}) => {

  const [isError, setIsError] = useState({ message: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const onClick = () => {
    sendTargetToBackend(originalTarget, target);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
      setIsError({ message: "" });
    }, 1500);

    return () => clearTimeout(timer);
  }, [isSuccess, isError.message]);

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

    if (!response.ok) setIsError({ message: "Request failed" });

    const data = await response.json();

    if (!data.code) setIsSuccess(true);
  };

  return (
    <Badge
      id="updatecode"
      className={`mx-2 border-0 cursor-pointer p-1 ${
        isSuccess ? "bg-teal-600" : "bg-cyan-700 hover:bg-cyan-600"
      }  text-white transition-all ease-in-out duration-300 h-[25px]`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center items-center overflow-hidden">
        <TerminalSquare size={15} />
        <span className={`px-2 align-text-bottom`}>
          {isError.message ? "Could not update code" : "Update code"}
        </span>
      </div>
    </Badge>
  );
};

export default ModifyCodeButton;
