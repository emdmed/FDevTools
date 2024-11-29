import { Input } from "../../ui/input";

interface InnerHTMLEditorProps {
  setInnerHTMLValue: React.Dispatch<React.SetStateAction<string>>;
  innerHTMLValue: string;
}

const InnerHTMLEditor: React.FC<InnerHTMLEditorProps> = ({
  setInnerHTMLValue,
  innerHTMLValue,
}) => {
  return (
    <div className="flex gap-x-1 justify-start items-center border-b pb-2">
      <small className="font-medium">innerHTML</small>
      <Input
        style={{ height: 25 }}
        className="focus-visible:ring-0 focus-visible:border-slate-900 bg-white mx-2"
        onChange={(e) => setInnerHTMLValue(e.target.value)}
        value={innerHTMLValue}
      />
    </div>
  );
};

export default InnerHTMLEditor;
