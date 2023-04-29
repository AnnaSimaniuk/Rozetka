import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

describe('Button', () => {
    test('renders a button', () => {
        render(<Button>Button</Button>);
        expect(screen.getByText("Button")).toBeInTheDocument();
    });

    test('renders children correctly', () => {
        render(<Button>Button</Button>);
        expect(screen.getByText("Button")).toHaveTextContent('Button');
    });

    test('adds custom class to button', () => {
        render(<Button classBtn="custom">Button</Button>);
        expect(screen.getByText("Button")).toHaveClass('custom');
    });

    test('disables button when disabled prop is true', () => {
        render(<Button disabled>Button</Button>);
        expect(screen.getByText("Button")).toBeDisabled();
    });

    test('calls onClick function when button is clicked', () => {
        const onClickMock = jest.fn();
        render(<Button onClick={onClickMock}>Button</Button>);
        fireEvent.click(screen.getByText("Button"));
        expect(onClickMock).toHaveBeenCalled();
    });

    test('renders a counter when counter prop is greater than 0', () => {
        render(<Button counter={2}>Click me</Button>);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('sets background color of counter span to backgroundColorCounter prop', () => {
        render(<Button counter={2} backgroundColorCounter="red">Click me</Button>);
        expect(screen.getByText('2')).toHaveStyle('background-color: red');
    });

    test('renders a button of type submit when type prop is "submit"', () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByText("Submit")).toHaveAttribute('type', 'submit');
    });
});
