import { Badge } from "../../ui/badge";

interface PositionDialogProps {
  boundingClient: DOMRect,
  style: CSSStyleDeclaration
}

const PositionDialog: React.FC<PositionDialogProps> = ({ boundingClient, style }) => {
  if (!style) return null;

  const badgeClass =
    "w-max border-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white";

  return (
    <div className="flex flex-col justify-start items-center gap-x-1 border-t border-b py-2">
      <div className="flex gap-x-1 items-center">
        <div className="flex gap-x-1 items-center">
          <Badge className={badgeClass} variant="outline">
            x: {boundingClient.x.toFixed(2)}
          </Badge>
          <Badge className={badgeClass} variant="outline">
            y: {boundingClient.y.toFixed(2)}
          </Badge>
        </div>
        <div className="flex gap-x-1 items-center">
          <Badge className={badgeClass} variant="outline">
            width: {boundingClient.width.toFixed(2)}
          </Badge>
          <Badge className={badgeClass} variant="outline">
            height: {boundingClient.height.toFixed(2)}
          </Badge>
        </div>
      </div>
      <div className="flex gap-x-1 items-center mt-1">
        <Badge className={badgeClass} variant="outline">
          top: {style.top}
        </Badge>
        <Badge className={badgeClass} variant="outline">
          left: {style.left}
        </Badge>
      </div>
    </div>
  );
};

export default PositionDialog;
