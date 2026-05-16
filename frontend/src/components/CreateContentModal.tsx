import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Inputbox from "./Inputbox";
import { contentAPI } from "../api/axios";

interface modalProps {
  modalStatus: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ onClose }: modalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("");

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) return;

    await contentAPI.postContent({ title, link, type });
  }

  return (
    <div className=" h-screen w-full fixed inset-0 bg-black/50  flex justify-center items-center">
      <div className="bg-white w-96 h-80 p-4 rounded-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <CrossIcon />
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center ">
            Add Content
          </h2>

          <Inputbox ref={titleRef} placeholder="Title" />
          <Inputbox ref={linkRef} placeholder="Link" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
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
              addContent();
              onClose();
            }}
            className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium text-sm transition-colors"
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
