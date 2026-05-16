import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateContentModal from "../components/CreateContentModal";
import Button from "../components/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import LogOutButton from "../components/LogOutButton";
import UseContent from "../hooks/UseContent";

const Dashborad = () => {
  const [showModal, setShowModal] = useState(false);
  const content = UseContent();
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
        <div className="flex justify-end items-center">
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

          <LogOutButton />
        </div>

        <div className="flex">
          {content.map(({ title, type, link, _id }) => (
            <Card key={_id} _id={_id} title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashborad;
