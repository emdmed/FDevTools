import { useState } from "react";
import { rgbToHex } from "../../../helpers/rbgToHex";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

type backgroundColorType = string | undefined;

const inputClass =
  "focus-visible:ring-0 focus-visible:border-slate-900 w-[100px] bg-white";

interface ColorSelectorProps {
  target: HTMLElement;
}

const ColorSelectors: React.FC<ColorSelectorProps> = ({ target }) => {
  const [backgroundColor, setBackgroundColor] = useState<backgroundColorType>(
    rgbToHex(window.getComputedStyle(target).backgroundColor) || ""
  );

  const [color, setColor] = useState<string>(
    rgbToHex(window.getComputedStyle(target).color) || ""
  );

  return (
    <div className="flex flex-col border-t pt-1 ">
      <div className="flex justify-between my-1 items-center">
        <small className="font-medium">Background color</small>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Input
              className={inputClass}
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <Button
            className="ms-1 bg-slate-900 hover:bg-slate-700 text-white"
            onClick={() => (target.style.backgroundColor = backgroundColor || "")}
          >
            Set
          </Button>
        </div>
      </div>
      <div className="flex justify-between my-1 items-center">
        <small className="font-medium">Color</small>
        <div className="flex">
          <div>
            <Input
              className={inputClass}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <Button
            className="ms-1 bg-slate-900 hover:bg-slate-700 text-white"
            onClick={() => (target.style.color = color)}
          >
            Set
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelectors;
