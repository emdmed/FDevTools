import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { TerminalSquare } from "lucide-react";
import { elementToObject } from "@/helpers/elementToObject";
import { useEffect, useState } from "react";

interface ModifyCodeButtonPops {
  target: HTMLElement;
  originalElement: HTMLElement | null;
  classes: string[];
}

const ModifyCodeButton: React.FC<ModifyCodeButtonPops> = ({
  target,
  originalElement,
  classes,
}) => {
  const [isError, setIsError] = useState({ message: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const onClick = () => {
    if (originalElement) {
      sendTargetToBackend(originalElement, target);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
      setIsError({ message: "" });
    }, 1500);

    return () => clearTimeout(timer);
  }, [isSuccess, isError.message]);

  const sendTargetToBackend = async (
    originalElement: HTMLElement,
    target: HTMLElement
  ) => {
    const parsedOriginalTarget = originalElement;
    const parsedNewTarget = elementToObject(target);

    const payload = {
      parsedOriginalTarget,
      parsedNewTarget,
    };

    try {
      const response = await fetch("http://localhost:1216/modify-element", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) setIsError({ message: "Request failed" });

      const data = await response.json();

      if (data.code) setIsSuccess(true);
    } catch (e) {
      setIsError({ message: "Error" });
    }
  };

  const buttonClass = isSuccess
    ? "bg-teal-500"
    : isError.message
    ? "bg-rose-600"
    : "bg-cyan-700 hover:bg-cyan-600";

  return (
    <Button
      disabled={!classes || classes.length === 0}
      id="updatecode"
      className={`mx-2 border-0 cursor-pointer p-1 ${buttonClass}  text-white transition-all ease-in-out duration-300 h-[25px]`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center items-center overflow-hidden">
        <TerminalSquare size={15} />
        <span className={`px-2 align-text-bottom`}>
          {isError.message && "Could not update code"}
          {isSuccess && "Code updated!"}
          {!isSuccess && !isError.message && "Update code"}
        </span>
      </div>
    </Button>
  );
};

export default ModifyCodeButton;
