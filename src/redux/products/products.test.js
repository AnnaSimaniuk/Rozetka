import {loadAllProducts, loadAllProductsData, loadProductsOfCategory, productsReducer} from "./productsReducer";
import {GET_PRODUCTS} from "./products";
import { getAllProducts, getAllProductsOfCategories, getAllProductsData } from "../../api/useHTTPRequest";
import { getProducts } from "./products";
jest.mock("../../api/useHTTPRequest");

describe('productsReducer', () => {
    const defaultState = {};

    test('should return the default state if no action is provided', () => {
        const state = productsReducer(undefined, {});
        expect(state).toEqual(defaultState);
    });

    test('should handle GET_PRODUCTS action with byRating payload', () => {
        const action = {
            type: GET_PRODUCTS,
            payload: {
                type: 'byRating',
                data: {
                    products: [
                        { id: 1, name: 'Product 1', rating: 4.5 },
                        { id: 2, name: 'Product 2', rating: 3.5 },
                        { id: 3, name: 'Product 3', rating: 5 },
                    ],
                },
            },
        };
        const state = productsReducer(defaultState, action);
        expect(state).toEqual({
            ...defaultState,
            ...action.payload.data,
            ...action.payload.data.products.sort((a, b) => b.rating - a.rating),
        });
    });

    test('should handle GET_PRODUCTS action with fromCheaperToExpensive payload', () => {
        const action = {
            type: GET_PRODUCTS,
            payload: {
                type: 'fromCheaperToExpensive',
                data: {
                    products: [
                        { id: 1, name: 'Product 1', price: '20' },
                        { id: 2, name: 'Product 2', price: '10' },
                        { id: 3, name: 'Product 3', price: '15' },
                    ],
                },
            },
        };
        const state = productsReducer(defaultState, action);
        expect(state).toEqual({
            ...defaultState,
            ...action.payload.data,
            ...action.payload.data.products.sort((a, b) => Number(a.price) - Number(b.price)),
        });
    });

    test('should handle GET_PRODUCTS action with fromExpensiveToCheaper payload', () => {
        const action = {
            type: GET_PRODUCTS,
            payload: {
                type: 'fromExpensiveToCheaper',
                data: {
                    products: [
                        { id: 1, name: 'Product 1', price: '20' },
                        { id: 2, name: 'Product 2', price: '10' },
                        { id: 3, name: 'Product 3', price: '15' },
                    ],
                },
            },
        };
        const state = productsReducer(defaultState, action);
        expect(state).toEqual({
            ...defaultState,
            ...action.payload.data,
            ...action.payload.data.products.sort((a, b) => Number(b.price) - Number(a.price)),
        });
    });

    test('should handle GET_PRODUCTS action with other payload types', () => {
        const action = {
            type: 'GET_PRODUCTS',
            payload: {
                type: 'otherType',
                data: {
                    products: [
                        { id: 1, name: 'Product 1' },
                        { id: 2, name: 'Product 2' },
                        { id: 3, name: 'Product 3' },
                    ],
                },
            },
        };
        const state = productsReducer(defaultState, action);
        expect(state).toEqual({ ...defaultState, ...action.payload.data });
    });
});

describe("loadAllProducts", () => {
    test("should dispatch getProducts with products and type", async () => {
        const products = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];
        const filter = "testFilter";
        const navigate = jest.fn();
        const pathname = "testPathname";
        const type = "testType";

        getAllProducts.mockResolvedValue(products);

        const dispatch = jest.fn();
        await loadAllProducts(filter, navigate, pathname, type)(dispatch);

        expect(getAllProducts).toHaveBeenCalledWith(filter, navigate, pathname);
        expect(dispatch).toHaveBeenCalledWith(getProducts(products, type));
    });
});

describe("loadProductsOfCategory", () => {
    test("should dispatch getProducts with products and type", async () => {
        const products = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];
        const category = "testCategory";
        const type = "testType";

        getAllProductsOfCategories.mockResolvedValue(products);

        const dispatch = jest.fn();
        await loadProductsOfCategory(category, type)(dispatch);

        expect(getAllProductsOfCategories).toHaveBeenCalledWith(category);
        expect(dispatch).toHaveBeenCalledWith(getProducts(products, type));
    });
});

describe("loadAllProductsData", () => {
    test("should dispatch getProducts with products", async () => {
        const products = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];

        getAllProductsData.mockResolvedValue(products);

        const dispatch = jest.fn();
        await loadAllProductsData()(dispatch);

        expect(getAllProductsData).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(getProducts(products));
    });
});
