import { render } from '@testing-library/react';

import App from '../App';
import { SHELLS_NUMBER } from '../../../constants/constants';
import * as helpers from '../helpers';
import * as hooks from '../hooks';

const defaultNumber = 2;
helpers.getRandomNumber = jest.fn().mockImplementation(() => defaultNumber);



describe('<App /> ', () => {
  it('renders game ready for start', () => {
    const { getByRole, container } = render(<App />);

    expect(getByRole('button', {
      name: /start/i
    })).toBeTruthy();

    expect(container.querySelectorAll('.shell')).toHaveLength(SHELLS_NUMBER);
  });

  it('should show winner message', () => {
    hooks.useShellGame = jest.fn().mockImplementation(() => ({
      victories: [true],
      positions: [[]]
    }));

    const { getByText } = render(<App />);

    expect(getByText(/You win/)).toBeTruthy()
  });

  it('should show looser message', () => {
    hooks.useShellGame = jest.fn().mockImplementation(() => ({
      victories: [false],
      positions: [[]]
    }));

    const { getByText } = render(<App />);

    expect(getByText(/You lose/)).toBeTruthy()
  });
});
