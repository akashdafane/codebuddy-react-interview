import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../../../components/common.js/index.js';

describe('button components testing', () => {
  test('Check the button render', async () => {
    render(<Button label="Click button" />);
    const labelElement = screen.getByText('Click button');
    expect(labelElement).toBeInTheDocument();
  });

  test('Check the button GetByRole', async () => {
    render(<Button label="Click button" />);
    const roleElement = screen.getByRole('button');
    expect(roleElement).toBeInTheDocument();
  });

  test('Check the button prependIcon value true', async () => {
    render(<Button label="Click button" icon="fas fa-plus" prependIcon />);
    const iconElement = screen.getByTestId('prePendIcon');
    expect(iconElement).toBeInTheDocument();
  });

  test('Check the button prependIcon value false', async () => {
    render(<Button label="Click button" icon="fas fa-plus" prependIcon={false} />);
    const iconElement = screen.getByTestId('postPendIcon');
    expect(iconElement).toBeInTheDocument();
  });

  test('Click on button', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click button" onClick={handleClick} />);
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByText(/Click button/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
