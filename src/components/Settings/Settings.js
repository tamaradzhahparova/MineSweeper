import { useDispatch } from "react-redux";

export const Settings = () => {
  const dispatch = useDispatch();

  return (
    <div className="settings">
      <div className="level">
        <p className="subTitle">Выберите уровень игры</p>
        <button className="button" onClick={() => changeLevel("easy")}>
          Простой
        </button>
        <button className="button" onClick={() => changeLevel("medium")}>
          Средний
        </button>
        <button className="button" onClick={() => changeLevel("hard")}>
          Сложный
        </button>
      </div>
    </div>
  );
};
