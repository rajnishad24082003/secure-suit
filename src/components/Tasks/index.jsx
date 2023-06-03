import { Task } from "../Task";
import styles from "./tasks.module.css";

export function Tasks({ tasks, onDelete }) {
  const tasksQuantity = tasks.length;
  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>total passwords</p>
          <span>{tasksQuantity}</span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}
