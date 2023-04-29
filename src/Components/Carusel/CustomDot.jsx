const CustomDot = ({onClick, img }) => (
    <img
        src={img}
        alt="Carousel dot"
        style={{ height:37, objectFit:"fill" }}
        onClick={onClick}
    />
);

export default CustomDot