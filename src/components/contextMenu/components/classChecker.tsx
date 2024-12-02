import { useEffect, useState } from "react";
import { copyToClipboard } from "../../../helpers/copyToClipboard";
import { Check, Copy, SquarePen, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Input } from "@/components/ui/input";
import { toggleClass } from "@/helpers/toggleClass";

interface ClassCheckerProps {
  target: HTMLElement;
}

const ClassChecker: React.FC<ClassCheckerProps> = ({ target }) => {
  const [copied, setCopied] = useState(false);
  const [classes, setClasses] = useState([...target.classList]);

  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [selectedArray, setSelectedArray] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [addClassValue, setAddClassValue] = useState("");

  useEffect(() => {
    setClasses([...target.classList]);
  }, [target, [...target.classList]]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (!isMultipleSelect) setSelectedArray([]);
  }, [isMultipleSelect]);

  useEffect(() => {
    if (isMultipleSelect) copyToClipboard(`.${selectedArray.join(" .")}`);
  }, [selectedArray, isMultipleSelect]);

  const handleClassSelect = (element: string) => {
    if (!editMode) {
      if (isMultipleSelect) {
        if (selectedArray.includes(element)) {
          //remove
          setSelectedArray(
            selectedArray.filter((className) => className !== element)
          );
        } else {
          setSelectedArray((prev) => [...prev, element]);
        }
      } else {
        copyToClipboard(`.${element}`);
        setCopied(true);
      }
    } else {
      toggleClass(target, element, "remove");
      setClasses(classes.filter((className) => className !== element));
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      addClassToElement(e.target.value);
    }
  };

  const addClassToElement = (string: string) => {
    const stringArray = string.split(" ") || string;

    stringArray.forEach((stringClass) =>
      toggleClass(target, stringClass, "add")
    );

    setAddClassValue("");
  };

  return (
    <div className="attribute-section border-b pb-2">
      <div className="my-1 flex items-center justify-between">
        <div className="flex items-center">
          <small className="font-medium">Classes</small>

          {!editMode && (
            <Badge
              onClick={() => setEditMode(true)}
              variant="outline"
              className="mx-2 p-1 cursor-pointer border-0"
            >
              <SquarePen size={15} />
            </Badge>
          )}
          {editMode && (
            <>
              <Input
                value={addClassValue}
                onChange={(e) => setAddClassValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Add class..."
                className="mx-2 bg-white focus:border focus:border-black"
                style={{ height: 25 }}
              />
              <Badge
                onClick={() => setEditMode(false)}
                variant="outline"
                className="mx-2 p-1 cursor-pointer border-0 font-normal text-slate-950"
              >
                <X size={15} />
              </Badge>
            </>
          )}
        </div>

        <div className="flex items-center justify-end">
          {copied && <small className="text-slate-500">Copied!</small>}

          {!editMode && (
            <Badge
              variant="outline"
              className="mx-2 p-1 cursor-pointer border-0"
              onClick={() => {
                copyToClipboard(`.${classes.join(" .")}`);
                setCopied(true);
              }}
            >
              <Copy size={15} />
            </Badge>
          )}

          {!editMode && (
            <>
              <Badge
                variant="outline"
                className="border-0 cursor-pointer hover:text-slate-700 font-normal"
                onClick={() => setIsMultipleSelect((prev) => !prev)}
              >
                {`${isMultipleSelect ? "Multi" : "Single"} select ${
                  selectedArray.length > 0 && isMultipleSelect
                    ? `(${selectedArray.length})`
                    : ""
                }`}
              </Badge>
            </>
          )}
        </div>
      </div>

      <div
        className="py-1 attribute-section flex items-center justify-start"
        style={{ maxWidth: 350, overflow: "auto" }}
      >
        {classes.map((element, index) => (
          <div>
            <Badge
              variant="outline"
              className={`w-max cursor-pointer mx-1 ${
                selectedArray.includes(element)
                  ? "bg-slate-900 text-white"
                  : "text-slate-900"
              } border-slate-900  ${
                !editMode ? "hover:text-white hover:bg-slate-900" : ""
              } ${editMode ? "hover:text-white hover:bg-rose-600" : ""}`}
              onClick={() => handleClassSelect(element)}
              key={`${element}_${index}`}
            >
              {element}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassChecker;
