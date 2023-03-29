import { useDispatch, useSelector } from "react-redux";
import { setLevel, setName } from "../../store/settingsSlice";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.settings.name);
  const level = useSelector(state => state.settings.level);
  let navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(setName(e));
  };

  const handleStart = () => {
    if (!name && !level) {
      return alert("Пожалуйста, введите имя и выберите сложность!");
    }

    if (!name) {
      return alert("Пожалуйста, введите имя");
    }

    if (!level) {
      return alert("Пожалуйста, выберите сложность");
    }

    return navigate("/game");
  };

  const data = [
    { value: "easy", text: "Простой 8x8, 10 мин" },
    { value: "medium", text: "Средний 16x16, 40 мин" },
    { value: "hard", text: "Сложный 32x16, 100 мин" }
  ];

  const setDifficulty = (value) => {
    switch (value) {
      case "easy":
        dispatch(setLevel([8, 8, 12, 10]));
        break;
      case "medium":
        dispatch(setLevel([16, 16, 20, 40]));
        break;
      case "hard":
        dispatch(setLevel([32, 16, 50, 100]));
        break;
    }
  };

  return (
    <div className={styles.settings}>
      <div>
        <h1 className={styles.subTitle}>Введите свое имя</h1>
        <input className={styles.nameInput} value={name} onChange={e => handleChange(e.currentTarget.value)} />
      </div>
      <div className={styles.level}>
        <h1 className={styles.subTitle}>Выберите уровень игры</h1>
        {data.map(item => (
          <label key={item.value} className={styles.label}>
            <input
              className={styles.input}
              value={item.value}
              name="settings"
              type="radio"
              onChange={e => setDifficulty(e.target.value)}
            />
            <span className={styles.span}>{item.text}</span>
          </label>
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={() => navigate("winners")}>
          Таблица лидеров
        </button>
        <button onClick={handleStart}>
          Начать игру
        </button>
      </div>

    </div>
  );
};
