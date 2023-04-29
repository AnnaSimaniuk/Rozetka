import { render, screen } from "@testing-library/react";
import CarouselImg from "./Carousel";
import CustomDot from "./CustomDot";

describe("Carousel", () => {
  const images = ["image1.png", "image2.png", "image3.png", "image4.png"];

  test("renders a carousel component wit images", () => {
    render(<CarouselImg images={images} />);
    const carouselImg = screen.getAllByRole('img')
    expect(carouselImg.length).toBe((images.length + 1)*2); //карусель містить в собі 4 зображення + 4 крапки з зображенням + основне
  });
});

describe('CarouselDot', ()=>{
  test('render an image with provider src', ()=>{
    const imageSrc = 'image.png'
    render(<CustomDot img={imageSrc}/>)
    const dotImg = screen.getByRole('img')
    expect(dotImg).toHaveAttribute('src', imageSrc)
  })
})