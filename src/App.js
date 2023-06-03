import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import { BsFillKeyFill } from "react-icons/bs";
import { ToastProvider, useToasts } from "react-toast-notifications";

const LOCAL_STORAGE_KEY = "securesuit:passwords";

function App() {
  const { addToast } = useToasts();
  const [tasks, setTasks] = useState([]);
  let tamp = tasks.slice();
  // useEffect(() => {
  //   tamp = tasks.slice();
  // }, [tasks]);
  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);
  let [key, setkey] = useState("");
  //
  function addTask(dataall) {
    let { password, username, website_name } = dataall;
    const secretKey = key;
    const encryptedMessage = AES.encrypt(password, secretKey).toString();
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        data: { encryptedMessage, username, website_name },
      },
    ]);
  }
  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(true);
  };

  let keyfun = (e) => {
    setkey(e.target.value);
  };
  console.log("tamp", tamp);
  console.log("tasks", tasks);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addToast("key entered", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      tamp.map((val, index) => {
        let decryptedBytes = AES.decrypt(val.data.encryptedMessage, key);
        const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        val.data.encryptedMessage = decryptedMessage;
      });
    }
  };
  return (
    <>
      <Header handleAddTask={addTask} dekey={key} />
      <Tasks tasks={tasks} onDelete={deleteTaskById} />
      <div
        className={`mb-4 w-60 absolute bottom-6 right-6 border shadow-md flex input-wrapper ${
          expanded ? "expanded" : ""
        }`}
        onClick={handleClick}
      >
        <div className="my-auto mx-1 opacity-50">
          <BsFillKeyFill></BsFillKeyFill>
        </div>
        <input
          className=" appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight border-none"
          id="username"
          type="text"
          value={key}
          onKeyDown={handleKeyPress}
          placeholder="enter decryption key"
          onChange={keyfun}
        />
      </div>
    </>
  );
}

export default App;
