import { render } from '@testing-library/react';
import App from '../App';
import {SHELLS_NUMBER} from "../../../constants/constants";

describe('<App /> ', () => {
  it('renders game ready for start', () => {
    const { getByRole, container } = render(<App />);

    expect(getByRole('button', {
      name: /start/i
    })).toBeTruthy();

    expect(container.querySelectorAll('.shell')).toHaveLength(SHELLS_NUMBER)
  })
});
