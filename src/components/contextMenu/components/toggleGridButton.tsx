import { Badge } from "../../ui/badge";
import { Grid2X2 } from "lucide-react";

interface ToggleGridButtonProps {
  setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleGridButton: React.FC<ToggleGridButtonProps> = ({ setIsGrid }) => {
  return (
    <Badge
      variant="outline"
      className="mx-2 border-0 cursor-pointer p-1"
      onClick={() => setIsGrid((prev) => !prev)}
    >
      <Grid2X2 size={15} />
    </Badge>
  );
};

export default ToggleGridButton;
