import { Badge } from "../../ui/badge";
import { copyToClipboard } from "../../../helpers/copyToClipboard";
import { useEffect, useState } from "react";

interface IdCheckerProps {
  target: HTMLElement;
}

const IdChecker: React.FC<IdCheckerProps> = ({ target }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="mt-2 flex items-center">
      <small className="font-medium me-2 py-1">Id</small>
      {target?.id && <Badge
        variant="outline"
        className="border-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white"
        onClick={() => {
          copyToClipboard(target.id);
          setIsCopied(true);
        }}
      >
        {target.id}
      </Badge>}
      {target?.id && <small>None</small>}
      {isCopied && <small className="text-slate-500 mx-2">Copied!</small>}
    </div>
  );
};

export default IdChecker;
