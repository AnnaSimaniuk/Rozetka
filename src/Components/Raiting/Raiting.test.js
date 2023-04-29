import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating component', () => {
    test('renders the rating and fills the appropriate stars', () => {
        const rating = 3;
        render(<Rating rating={rating} />);
        expect(screen.getByText(rating.toString())).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveStyle({ width: `${83 * rating * 2 / 10}px` });
    });
});