import s from "./Rating.module.scss";

const Rating = ({ rating }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.star}>
        ★★★★★
        <span role='dialog' className={s.starFill} style={{ width: (83 * rating * 2) / 10 }}>
          ★★★★★
        </span>
      </div>
      <div className={s.rating}>{rating}</div>
    </div>
  );
};

export default Rating;