import { useState } from "react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import s from "./Map.module.scss";

const Map = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDYNUjT2q2oMllTCjy7YVNQ_UvBYiQHmps",
  });
  const center = props.center;
  const markers = props.markers;
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  const handleMarkerClick = (id, lat, lng, info) => {
    setInfoWindowData({ id, info });
    setIsOpen(true);
  };

  return (
    <div className={s.mapWrapper}>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={s.mapWrapper}
          center={{ ...center }}
          zoom={15}
          onClick={() => setIsOpen(false)}
        >
          {markers.map(({ lat, lng, info }, index) => (
            <Marker
              key={index}
              position={{ lat, lng }}
              icon={props.icon}
              onClick={() => {
                handleMarkerClick(index, lat, lng, info);
              }}
            >
              {isOpen && infoWindowData?.id === index && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.info}</h3>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
