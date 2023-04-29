import {capitalize} from "../tools/capitalize";
import {generateArr} from "../tools/generateArr";
import { renderHook } from "@testing-library/react-hooks";
import { useLocation } from "react-router-dom";
import {useQuery} from "../tools/useQuery";

describe("capitalize function", () => {
    test("should capitalize the first letter of a string", () => {
        const input = "hello world";
        const expectedOutput = "Hello world";
        const output = capitalize(input);
        expect(output).toEqual(expectedOutput);
    });

    test("should return an empty string if given an empty string", () => {
        const input = "";
        const expectedOutput = "";
        const output = capitalize(input);
        expect(output).toEqual(expectedOutput);
    });

    test("should return the same string if the first character is already capitalized", () => {
        const input = "Hello world";
        const expectedOutput = "Hello world";
        const output = capitalize(input);
        expect(output).toEqual(expectedOutput);
    });
});

describe("generateArr function", () => {
    test("should generate an array of numbers from 1 to the input number", () => {
        const input = 5;
        const expectedOutput = [1, 2, 3, 4, 5];
        const output = generateArr(input);
        expect(output).toEqual(expectedOutput);
    });

    test("should return an empty array if given 0", () => {
        const input = 0;
        const expectedOutput = [];
        const output = generateArr(input);
        expect(output).toEqual(expectedOutput);
    });

    test("should generate an array with a single number if given 1", () => {
        const input = 1;
        const expectedOutput = [1];
        const output = generateArr(input);
        expect(output).toEqual(expectedOutput);
    });
});


jest.mock("react-router-dom", () => ({
    useLocation: jest.fn(),
}));

describe("useQuery", () => {
    test("should return a URLSearchParams object representing the query string", () => {
        const search = "?foo=bar&baz=qux";
        useLocation.mockReturnValueOnce({ search });

        const { result } = renderHook(() => useQuery());
        expect(result.current.get("foo")).toBe("bar");
        expect(result.current.get("baz")).toBe("qux");
    });

    test("should return an empty URLSearchParams object if no query string is present", () => {
        const search = "";
        useLocation.mockReturnValueOnce({ search });

        const { result } = renderHook(() => useQuery());
        expect(result.current.toString()).toBe("");
    });
});

//TODO console.error to change test