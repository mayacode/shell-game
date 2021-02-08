import { render } from '@testing-library/react';

import * as hooks from '../hooks';

import Shell from '../Shell';

function getTransformValueFromContainer(container) {
  const styleStr = container.querySelector('div').getAttribute('style');
  const styleArr = styleStr.split(';');
  const transform = styleArr.find(str => str.includes('transform'));

  return transform.split(':')[1].trim()
}

describe('<Shell />', () => {
  it('should not render ball if hook returns ballVisible false', () => {
    hooks.useShell = jest.fn().mockImplementation(() => ({
      ballVisible: false,
      rotatedShell: false,
    }));
    const { container } = render(<Shell />);

    expect(container.querySelector('span')).toEqual(null);

    hooks.useShell.mockReset();
  });

  it('should render ball if hook returns ballVisible true', () => {
    hooks.useShell = jest.fn().mockImplementation(() => ({
      ballVisible: true,
      rotatedShell: false,
    }));
    const { container } = render(<Shell />);

    expect(container.querySelectorAll('span')).toHaveLength(1);

    hooks.useShell.mockReset();
  });

  it('should not create rotation if rotatedShell is false', () => {
    hooks.useShell = jest.fn().mockImplementation(() => ({
      ballVisible: false,
      rotatedShell: false,
    }));

    const { container } = render(<Shell />);

    expect(getTransformValueFromContainer(container)).toEqual('rotate(0deg)');
  });

  it('should create rotation if rotatedShell is true', () => {
    hooks.useShell = jest.fn().mockImplementation(() => ({
      ballVisible: false,
      rotatedShell: true,
    }));

    const { container } = render(<Shell />);

    expect(getTransformValueFromContainer(container)).toEqual('rotate(45deg)');
  });
});
