import styles from "./task.module.css";
import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsClipboard } from "react-icons/bs";

export function Task({ task, onDelete }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(task.data.encryptedMessage)
      .then(() => {
        console.log("Text copied to clipboard:", task.data.encryptedMessage);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  return (
    <div className={styles.task}>
      <div>
        <p className={""}>{task.data.website_name}</p>
      </div>
      <div>
        <p className={""}>{task.data.username}</p>
      </div>
      <div className="text-opacity-80 text-white">
        <div className="flex w-52 container">
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={task.data.encryptedMessage}
            readOnly
            className="w-full px-1 py-1 text-base rounded outline-none bg-transparent"
          />
          <button
            className=" inset-y-0 opacity-80 right-0 flex items-center px-1 "
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
            ) : (
              <AiOutlineEye></AiOutlineEye>
            )}
          </button>
          <button onClick={handleCopyClick}>
            <BsClipboard></BsClipboard>
          </button>
        </div>
        {/* <p className={""}>{task.data.password}</p> */}
      </div>
      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
