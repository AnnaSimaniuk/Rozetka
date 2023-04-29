import { useEffect, useState } from "react";
import { getCity } from "../../../api/useHTTPRequest";
import ModalChooseCity from "../Modal/ModalChooseCity";
import NPOptions from "./NPOptions";
import MEOptions from "./MEOptions";
import s from "./Delivery.module.scss";
import location from "../../../assets/img/location.png";
import nextArrow from "../../../assets/img/next.png";

const Delivery = ({ setFieldValue }) => {
  const [city, setCity] = useState({
    Description: "Івано-Франківськ",
    RegionsDescription: "",
    AreaDescription: "Івано-Франківська область",
  });
  const [modal, setModal] = useState(false);
  const [allListCity, setAllListCity] = useState([]);
  const [optionDelivery, setOptionDelivery] = useState({ NP: true, ME: false });
  const [postOffice, setPostOffice] = useState({});

  const handleClickModal = () => setModal(!modal);

  const handleChooseCity = () => {
    setModal(false);
    setPostOffice({});
  };

  useEffect(() => {
    getCity(city.Description, setAllListCity);
  }, [city]);

  return (
    <div className={s.detailsWrapper}>
      <h5 className={s.loginTitle}>
        <span className={s.numEl}>2</span>Доставка
      </h5>
      <button
        type="button"
        className={s.chooseCityBtn}
        onClick={handleClickModal}
      >
        <img className={s.locationLogo} src={location} alt="location" />
        <div>
          <p className={s.cityTitle}>Ваше місто:</p>
          <p>
            {city.Description} {city.AreaDescription}
          </p>
        </div>
        <img src={nextArrow} alt="next" />
      </button>
      <div>
        <NPOptions
          setFieldValue={setFieldValue}
          optionDelivery={optionDelivery}
          setOptionDelivery={setOptionDelivery}
          city={city}
          postOffice={postOffice}
          setPostOffice={setPostOffice}
        />
        <MEOptions
          setFieldValue={setFieldValue}
          optionDelivery={optionDelivery}
          setOptionDelivery={setOptionDelivery}
          city={city}
          postOffice={postOffice}
          setPostOffice={setPostOffice}
        />
      </div>

      {modal && (
        <ModalChooseCity
          handleClickModal={handleClickModal}
          city={city}
          setCity={setCity}
          allListCity={allListCity}
          handleChooseCity={handleChooseCity}
        />
      )}
    </div>
  );
};

export default Delivery;
