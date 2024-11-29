import { Button } from "../../ui/button";
import { X } from "lucide-react";

interface CloseContextMenuButtonProps {
  contextMenu: {
    visible: boolean;
    event: {
      clientX: number;
      clientY: number;
      completeEvent: MouseEvent | null;
    };
  };
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      event: {
        clientX: number;
        clientY: number;
        completeEvent: MouseEvent | null;
      };
    }>
  >;
}

const CloseContextMenuButton: React.FC<CloseContextMenuButtonProps> = ({
  setContextMenu,
  contextMenu,
}) => {
  return (
    <Button
      className="hover:text-pink-600 hover:bg-white"
      size="icon"
      variant="ghost"
      onClick={() => setContextMenu({ ...contextMenu, visible: false })}
    >
      <X />
    </Button>
  );
};

export default CloseContextMenuButton;
