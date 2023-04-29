import Modal from "../../../Components/Modal/Modal";
import s from "./ModalChooseCity.module.scss";
import logo from "../../../assets/img/logoOrder.png";
import delivery from "../../../assets/img/fast-delivery.png";
import Button from "../../../Components/Button/Button";
import { removeAllFromBasket } from "../../../redux/basketProducts/basketProduct";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModalOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickCloseModal = () => {
    navigate("/products/all?limit=8&skip=0");
    dispatch(removeAllFromBasket());
  };

  return (
    <Modal closeModal={handleClickCloseModal}>
      <div className={s.modalOrderWrapper}>
        <img src={logo} alt="logo" />
        <p>Вітаємо! Ваше замовлення вже прямує до Вас!</p>
        <img src={delivery} alt="delivery" />
        <Button
          type="button"
          classBtn={s.modalBtn}
          onClick={handleClickCloseModal}
        >
          Продовжити покупки
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOrder;

