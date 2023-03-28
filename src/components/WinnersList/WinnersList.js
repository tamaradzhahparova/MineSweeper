import { useEffect, useState } from "react";
import s from "./WinnersList.module.css";
import { useNavigate } from "react-router-dom";

export const WinnersList = () => {
  const [winners, setWinners] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {

    const result = [];

    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
      result.push({
        name: key,
        time: localStorage.getItem(key)
      });
    }
    setWinners(result.sort((a, b) => a.time - b.time));

  }, []);

  return <>
    <button onClick={() => navigate('/')}>
      вернуться к списку настроек
    </button>

    <ul className={s.listWrapper}>
      {winners.length > 0 ? winners.map((item, index) => <li className={s.item}>
        <span>{index + 1}.</span>
        {`${item.name} ${item.time}sec`}
      </li>) : <div>
        У нас пока нет победителей :)
      </div>}
    </ul>;

  </>


};
