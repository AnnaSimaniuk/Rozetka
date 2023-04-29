import { RotatingLines } from "react-loader-spinner";
import s from './Loader.module.scss'

const Loader = () => {
  return (
   <div className={s.wrapper}>
     <RotatingLines
         strokeColor="#00a046"
         strokeWidth="5"
         animationDuration="0.75"
         width="96"
         visible={true}
     />
   </div>
  );
};

export default Loader;
