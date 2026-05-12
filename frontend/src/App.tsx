import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";
import Button from "./components/Button";
import Card from "./components/Card";
import CreateContentModal from "./components/CreateContentModal";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Sidebar />
      <div className=" bg-blue-50 min-h-screen p-4 ml-64">
        {showModal && (
          <CreateContentModal
            modalStatus={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
        <div className="flex justify-end ">
          <Button
            variants="primary"
            size="md"
            title="add content"
            starticon={<PlusIcon size="md" />}
            onClick={() => {
              setShowModal(true);
            }}
          />

          <Button
            variants="secondary"
            size="md"
            title="Share brain"
            starticon={<ShareIcon size="md" />}
          />
        </div>

        <div className="flex">
          <Card
            title="First Tweet"
            type="tweet"
            link="https://x.com/nandini__bagga/status/2053012195651559651"
          />

          <Card
            title="harkirat pod"
            type="youtube"
            link="https://www.youtube.com/watch?v=xSt5NJhG5tE"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
