import { useEffect, useState } from "react";
import {
  getPostOfficeME,
  getSingleInfoPostOfficeME,
} from "../../../api/useHTTPRequest";
import downArrow from "../../../assets/img/down-arrow.png";
import Button from "../../../Components/Button/Button";
import Map from "../../../Components/Map/Map";
import MEicon from "../../../assets/img/MElogo.png";
import cn from "classnames";
import s from "./Delivery.module.scss";

const MEOptions = ({
  setFieldValue,
  optionDelivery,
  setOptionDelivery,
  city,
  postOffice,
  setPostOffice,
}) => {
  const [postOfficeList, setPostOfficeList] = useState({
    status: false,
    data: [],
  });
  const [markers, setMarkers] = useState([]);
  const [centerMarker, setCenterMarker] = useState({});

  const handleClickDeliveryME = () => {
    setOptionDelivery({ NP: false, ME: true });
    setPostOffice({});
  };

  const handleClickSelectOffice = () => {
    setPostOfficeList((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  useEffect(() => {
    if (optionDelivery.ME) {
      getPostOfficeME(city.Description, setPostOfficeList);
    }
  }, [city.Description, optionDelivery.ME]);

  const handleClickPostOffice = (el) => {
    getSingleInfoPostOfficeME(el.br_id, setPostOffice);
    setFieldValue("postOffice", el, false);
    setCenterMarker({
      lat: Number(el.lat),
      lng: Number(el.lng),
      info: `${el.type_public.ua}№ ${el.num_showcase}`,
    });
    setPostOfficeList((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  useEffect(() => {
    const data = postOfficeList.data.map((el) => ({
      lat: Number(el.lat),
      lng: Number(el.lng),
      info: `${el.type_public.ua}№ ${el.num_showcase}`,
    }));
    setMarkers(data);
  }, [postOfficeList.data]);

  return (
    <div
      className={cn(
        s.deliveryWrapper,
        optionDelivery.ME ? s.deliveryWrapperSelect : ""
      )}
    >
      <div
        onClick={handleClickDeliveryME}
        className={cn(s.radio, optionDelivery.ME ? s.radioSelect : "")}
      >
        <span>Самовивіз з Meest Express</span>
        <span>79₴</span>
      </div>
      {optionDelivery.ME && (
        <div className={s.selectWrapper}>
          <Button classBtn={s.selectBtn} onClick={handleClickSelectOffice}>
            <p className={s.selectBtnText}>
              <span>
                {!!Object.keys(postOffice).length
                  ? postOffice.type_public.ua + "№ " + postOffice.num_showcase
                  : "Виберіть відповідне відділення"}
              </span>
              <img src={downArrow} alt="arrow" />
            </p>
          </Button>
          {postOfficeList.status && (
            <ul className={s.selectOptions}>
              {postOfficeList.data.length > 1 ? (
                postOfficeList.data.map((office) => {
                  const { br_id, type_public, num_showcase } = office;
                  return (
                    <li
                      key={br_id}
                      className={s.officeItem}
                      onClick={() => handleClickPostOffice(office)}
                    >
                      {type_public.ua + "№ " + num_showcase}
                    </li>
                  );
                })
              ) : (
                <li className={s.officeItem}>
                  Нажаль в вашому місті немає відділень Meest Express. Будь
                  ласка оберіть інше місто.
                </li>
              )}
            </ul>
          )}
          {Object.keys(postOffice).length > 0 && (
            <div className={s.dopInfoWrapper}>
              <ul className={s.scheduleList}>
                {postOffice.working_hours.split(",").map((el, index) => (
                  <li key={index} className={s.scheduleItem}>
                    {el}
                  </li>
                ))}
              </ul>
              {Object.keys(centerMarker).length > 0 &&
                Object.keys(markers).length > 0 && (
                  <Map center={centerMarker} markers={markers} icon={MEicon} />
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MEOptions;
