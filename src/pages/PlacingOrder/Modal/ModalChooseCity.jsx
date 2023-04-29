import s from "./ModalChooseCity.module.scss";
import truck from "../../../assets/img/truck.png";
import cn from "classnames";
import TextInput from "../../../Components/Form/TextInput";
import Button from "../../../Components/Button/Button";
import Modal from "../../../Components/Modal/Modal";

const ModalChooseCity = (props) => {
  const { handleClickModal, city, setCity, allListCity, handleChooseCity } = props;

  const popularCity = [
      {Description:"Київ", AreaDescription:"Київська область"},
      {Description:"Харків", AreaDescription:"Харківська область"},
      {Description:"Одеса", AreaDescription:"Одеська область"},
      {Description:"Дніпро", AreaDescription:"Дніпропетровська область"},
      {Description:"Запоріжжя", AreaDescription:"Запорізька область"},
      {Description:"Львів", AreaDescription:"Львівська область"},
  ];

  const handleChangeCity = (e) =>
      setCity({
        Description: e.target.value,
        AreaDescription: "",
        RegionsDescription: "",
      });

  return (
    <Modal closeModal={handleClickModal}>
      <h4 className={s.modalTitle}>Виберіть своє місто</h4>
      <div className={s.modalContentWrapper}>
        <div className={s.modalLogo}>
          <img src={truck} alt="truck" />
          <span>Доставляємо замовлення по всій Україні!</span>
        </div>
        <ul className={s.popularCityList}>
          {popularCity.map((el) => {
            return (
              <li
                key={el.Description}
                className={cn(
                  s.popularCityItem,
                  city.Description.toLowerCase() ===
                    el.Description.toLowerCase()
                    ? s.activeCity
                    : ""
                )}
                onClick={() =>
                  setCity({
                    Description: el.Description,
                    AreaDescription: "",
                    RegionsDescription: el.AreaDescription,
                  })
                }
              >
                {el.Description}
              </li>
            );
          })}
        </ul>
        <TextInput
          label="Вкажіть населений пункт України (пошук тільки українською мовою)"
          value={city.Description}
          onChange={handleChangeCity}
          name="city"
          type="text"
        />
        {allListCity.length === 0 && (
          <p className={s.cityError}>
            Місто не знайдено. Перевірте правильність написання.
          </p>
        )}
        <ul className={s.cityList}>
          {allListCity.length > 1 &&
            allListCity.map((data) => {
              const {
                Ref,
                SettlementTypeDescription,
                Description,
                RegionsDescription,
                AreaDescription,
              } = data;
              return (
                <li
                  key={Ref}
                  onClick={() =>
                    setCity({
                      Description,
                      AreaDescription,
                      RegionsDescription,
                    })
                  }
                  className={cn(
                    s.cityItem,
                    city.Description === Description &&
                      city.AreaDescription === AreaDescription &&
                      city.RegionsDescription === RegionsDescription
                      ? s.activeCityItem
                      : ""
                  )}
                >
                  {SettlementTypeDescription} {Description} {RegionsDescription}{" "}
                  {AreaDescription}
                </li>
              );
            })}
        </ul>
        <Button
          classBtn={s.modalBtn}
          onClick={handleChooseCity}
          disabled={city.Description === "" || allListCity.length === 0}
        >
          Застосувати
        </Button>
      </div>
      <p className={s.modalDopInfo}>
        Вибір міста допоможе надати актуальну інформацію про наявність товару,
        його ціни та методів доставки у вашому місті! Це допоможе зберегти
        більше вільного часу для вас!
      </p>
    </Modal>
  );
};

export default ModalChooseCity