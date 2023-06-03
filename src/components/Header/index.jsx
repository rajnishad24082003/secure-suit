import securesuit from "../../assets/logo-white.png";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";

export function Header({ handleAddTask, dekey }) {
  const { addToast } = useToasts();
  const [website_name, setwebsite_name] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  function handleSubmit(event) {
    if (dekey === "") {
      addToast("please enter key", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } else {
      event.preventDefault();
      handleAddTask({ website_name, username, password });
      setwebsite_name("");
      setusername("");
      setpassword("");
    }
  }

  function onChangeWeb(event) {
    setwebsite_name(event.target.value);
  }
  function onChangeUser(event) {
    setusername(event.target.value);
  }
  function onChangepass(event) {
    setpassword(event.target.value);
  }

  return (
    <header className={styles.header}>
      <img src={securesuit} className="w-60" />

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="website name"
          type="text"
          onChange={onChangeWeb}
          value={website_name}
        />
        <input
          placeholder="username"
          type="text"
          onChange={onChangeUser}
          value={username}
        />
        <input
          placeholder="password"
          type="text"
          onChange={onChangepass}
          value={password}
        />
        <button>
          ADD <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
