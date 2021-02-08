import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> ', () => {
  it('renders game ready for start', () => {
    const { getByRole, container } = render(<App />);

    expect(getByRole('button', {
      name: /start/i
    })).toBeTruthy();

    expect(container.querySelectorAll('.shell')).toHaveLength(3)
  })
});
