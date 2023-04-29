import Button from "../Button/Button";

import s from "./Modal.module.scss";

const Modal = (props) => {
  const {
    addProduct = false,
    deleteProduct = false,
    closeModal,
    onclick,
    onclickSecondBtn,
    data = {},
    children,
  } = props;

  return (
    <div className={s.modal}>
      <div className={s.overlay} onClick={closeModal} />
      <div className={s.modalContentWrapper}>
        <button className={s.modalClose} onClick={closeModal}>
          ✖
        </button>
        {children}

        {addProduct && (
          <>
            <h3 className={s.modalHeader}>Ваш товар успішно додано в кошик</h3>
            <div>
              <img
                className={s.productImg}
                src={data.thumbnail}
                alt="product"
              />
              <p>{data.title}</p>
              <p>{Number(data.price).toLocaleString("ua") + "₴"}</p>
            </div>
            <div className={s.btnWrapper}>
              <Button classBtn={s.modalBtn} onClick={onclick}>
                Продовжити покупки
              </Button>
            </div>
          </>
        )}

        {deleteProduct && (
          <>
            <h3 className={s.modalHeader}>
              Ви впевнені, що бажаєте видалити товар?
            </h3>
            <div>
              <img
                className={s.productImg}
                src={data.thumbnail}
                alt="product"
              />
              <p>{data.title}</p>
              <p>{Number(data.price).toLocaleString("ua") + "₴"}</p>
            </div>
            <div className={s.btnWrapper}>
              <Button classBtn={s.modalBtn} onClick={onclick}>
                Відміна
              </Button>
              <Button classBtn={s.modalBtn} onClick={onclickSecondBtn}>
                Так
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
