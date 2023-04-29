import { getPostOfficeNP } from "../../../api/useHTTPRequest";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import downArrow from "../../../assets/img/down-arrow.png";
import Map from "../../../Components/Map/Map";
import NPicon from "../../../assets/img/NPlogo.png";
import cn from "classnames";
import s from "./Delivery.module.scss";

const NPOptions = ({
  optionDelivery,
  setOptionDelivery,
  city,
  postOffice,
  setPostOffice,
  setFieldValue,
}) => {
  const [postOfficeList, setPostOfficeList] = useState({
    status: false,
    data: [],
  });
  const [markers, setMarkers] = useState([]);
  const [centerMarker, setCenterMarker] = useState({});

  useEffect(() => {
    const data = postOfficeList.data.map((el) => ({
      lat: Number(el.Latitude),
      lng: Number(el.Longitude),
      info: el.Description,
    }));
    setMarkers(data);
  }, [postOfficeList.data]);

  const handleClickDeliveryNP = () => {
    setOptionDelivery({ NP: true, ME: false });
    setPostOffice({});
  };

  const handleClickSelectOffice = () => {
    setPostOfficeList((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  const handleClickPostOffice = (el) => {
    setFieldValue("postOffice", el, false);
    setPostOffice(el);
    setCenterMarker({
      lat: Number(el.Latitude),
      lng: Number(el.Longitude),
      info: el.Description,
    });
    setPostOfficeList((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  useEffect(() => {
    if (optionDelivery.NP) {
      getPostOfficeNP(city, setPostOfficeList);
    }
  }, [city, optionDelivery.NP]);

  return (
    <div
      className={cn(
        s.deliveryWrapper,
        optionDelivery.NP ? s.deliveryWrapperSelect : ""
      )}
    >
      <div
        onClick={handleClickDeliveryNP}
        className={cn(s.radio, optionDelivery.NP ? s.radioSelect : "")}
      >
        <span>Самовивіз з Нової Пошти</span> <span>119₴</span>
      </div>
      {optionDelivery.NP && (
        <div className={s.selectWrapper}>
          <Button classBtn={s.selectBtn} onClick={handleClickSelectOffice}>
            <p className={s.selectBtnText}>
              <span>
                {!!Object.keys(postOffice).length
                  ? postOffice.Description
                  : "Виберіть відповідне відділення"}
              </span>
              <img src={downArrow} alt="arrow" />
            </p>
          </Button>
          {postOfficeList.status && (
            <ul className={s.selectOptions}>
              {postOfficeList.data.length > 1 ? (
                postOfficeList.data.map((office) => {
                  const { SiteKey, Description } = office;
                  return (
                    <li
                      key={SiteKey}
                      className={s.officeItem}
                      onClick={() => handleClickPostOffice(office)}
                    >
                      {Description}
                    </li>
                  );
                })
              ) : (
                <li className={s.officeItem}>
                  Нажаль в вашому місті немає відділень Нової пошти. Будь ласка
                  оберіть інше місто.
                </li>
              )}
            </ul>
          )}
          {Object.keys(postOffice).length > 0 && (
            <div className={s.dopInfoWrapper}>
              <ul className={s.scheduleList}>
                <li className={s.scheduleItem}>
                  Пн - Пт: {postOffice.Delivery.Monday}
                </li>
                <li className={s.scheduleItem}>
                  Сб: {postOffice.Delivery.Saturday}
                </li>
                <li className={s.scheduleItem}>
                  Нд: {postOffice.Delivery.Sunday}
                </li>
              </ul>
              {Object.keys(centerMarker).length > 0 &&
                Object.keys(markers).length > 0 && (
                  <Map center={centerMarker} markers={markers} icon={NPicon} />
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NPOptions;
