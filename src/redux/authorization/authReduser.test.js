import { authReducer } from './authReducer';
import { OPEN_MODAL_AUTH, CLOSE_MODAL_AUTH, SUCCESSFUL_AUTH } from './auth';

describe('authReducer', () => {
    const initialState = {
        authorization: false,
        statusModal: false,
    };

    test('returns the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    test('handles OPEN_MODAL_AUTH', () => {
        expect(authReducer(initialState, { type: OPEN_MODAL_AUTH })).toEqual({
            authorization: false,
            statusModal: true,
        });
    });

    test('handles CLOSE_MODAL_AUTH', () => {
        expect(authReducer(initialState, { type: CLOSE_MODAL_AUTH })).toEqual({
            authorization: false,
            statusModal: false,
        });
    });

    test('handles SUCCESSFUL_AUTH', () => {
        expect(authReducer(initialState, { type: SUCCESSFUL_AUTH })).toEqual({
            authorization: true,
            statusModal: false,
        });
    });
});