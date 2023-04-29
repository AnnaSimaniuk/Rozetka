import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
    const data = {
        thumbnail: "https://example.com/image.jpg",
        title: "Product title",
        price: 99.99,
    };

    test("should render without errors", () => {
        render(<Modal />);
    });

    test("should render add product modal correctly", () => {
        render(<Modal addProduct={true} data={data} />);

        expect(screen.getByText("Ваш товар успішно додано в кошик")).toBeInTheDocument();
        expect(screen.getByAltText("product")).toHaveAttribute("src", data.thumbnail);
        expect(screen.getByText(data.title)).toBeInTheDocument();
        expect(screen.getByText(`${Number(data.price).toLocaleString("ua")}₴`)).toBeInTheDocument();
        expect(screen.getByText("Продовжити покупки")).toBeInTheDocument();
    });

    test("should render delete product modal correctly", () => {
      render(<Modal deleteProduct={true} data={data} />);

        expect(
            screen.getByText("Ви впевнені, що бажаєте видалити товар?")
        ).toBeInTheDocument();
        expect(screen.getByAltText("product")).toHaveAttribute("src", data.thumbnail);
        expect(screen.getByText(data.title)).toBeInTheDocument();
        expect(screen.getByText(`${Number(data.price).toLocaleString("ua")}₴`)).toBeInTheDocument();
        expect(screen.getByText("Відміна")).toBeInTheDocument();
        expect(screen.getByText("Так")).toBeInTheDocument();
    });

    test("should call the onclick function when the first button is clicked", () => {
        const onClickMock = jest.fn();
        render(<Modal addProduct={true} data={data} onclick={onClickMock} />);

        const button = screen.getByText("Продовжити покупки");
        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalled();
    });

    test("should call the onclickSecondBtn function when the second button is clicked", () => {
        const onClickSecondBtnMock = jest.fn();
        render(
            <Modal
                deleteProduct={true}
                data={data}
                onclickSecondBtn={onClickSecondBtnMock}
            />
        );

        const button = screen.getByText("Так");
        fireEvent.click(button);

        expect(onClickSecondBtnMock).toHaveBeenCalled();
    });
});