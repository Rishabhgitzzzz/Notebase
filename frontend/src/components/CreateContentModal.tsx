import CrossIcon from "../icons/CrossIcon";
import Inputbox from "./Inputbox";

interface modalProps {
  modalStatus: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ onClose }: modalProps) => {
  return (
    <div className=" h-screen w-full fixed inset-0 bg-black/50  flex justify-center items-center">
      <div className="bg-white w-96 h-80 p-4 rounded-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <CrossIcon />
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Add Content
          </h2>

          <Inputbox placeholder="Title" />
          <Inputbox placeholder="Link" />
          <select
            // value={type}
            // onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-3 py-2 mb-4 text-sm outline-none focus:border-purple-400"
          >
            <option value="" disabled>
              Type
            </option>
            <option value="youtube">YouTube</option>
            <option value="tweet">Tweet</option>
          </select>

          <button
            onClick={() => {
              // onSubmit(title, link, type);
              onClose();
            }}
            className="w-full bg-purple-600 text-white rounded-md py-2 text-sm font-medium hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;

//  className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 text-sm outline-none focus:border-purple-400"
