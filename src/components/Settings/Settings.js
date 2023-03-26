import { useDispatch, useSelector } from "react-redux";
import { setLevel, setName } from "../../store/settingsSlice";
import styles from "./Settings.module.css";

export const Settings = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.settings.name);

  const handleChange = (e) => {
    dispatch(setName(e));
  };

  const data = [
    { value: "easy", text: "Простой 8x8, 10 мин" },
    { value: "medium", text: "Средний 16x16, 40 мин" },
    { value: "hard", text: "Сложный 32x16, 100 мин" }
  ];

  const setDifficulty = (value) => {
    dispatch(setLevel(value));
  };

  return (
    <div className={styles.settings}>
      <div className="name">
        <h1 className="subTitle">Введите свое имя</h1>
        <input className="nameInput" value={name} onChange={e => handleChange(e.currentTarget.value)} />
      </div>
      <div className="level">
        <h1 className="subTitle">Выберите уровень игры</h1>
        {data.map(item => (
          <label key={item.value} className={styles.label}>
            <input
              className={styles.input}
              value={item.value}
              name="settings"
              type="radio"
              // checked={difficulty === item.value}
              onChange={e => setDifficulty(e.target.value)}
            />
            <span className={styles.span}>{item.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
