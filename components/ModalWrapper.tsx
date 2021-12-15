import ReactModal from "react-modal";

interface IProps {
  children: any;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: "large" | "small";
}

ReactModal.setAppElement("#__next");

export default function ModalWrapper({
  children,
  isOpen,
  setIsOpen,
  size = "small",
}: IProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      className={`absolute ${
        size === "large" ? "w-1/2" : "w-1/3"
      } p-8 rounded-lg h-[fit-content] flex flex-col items-center bg-background top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] right-0 bottom-0`}
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-opacity-40 bg-gray-800"
      onRequestClose={() => setIsOpen((prev) => !prev)}
    >
      {children}
    </ReactModal>
  );
}
