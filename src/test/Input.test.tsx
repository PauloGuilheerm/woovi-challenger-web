import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '../components/ui';

describe('Input Component', () => {
  test('renders Input component with default props', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument();
  });

  test('renders Input component with custom className', () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-class');
  });

  test('renders Input component with type attribute', () => {
    render(<Input type="text" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('renders Input component with placeholder', () => {
    render(<Input placeholder="Enter text here" />);
    const inputElement = screen.getByPlaceholderText('Enter text here');
    expect(inputElement).toBeInTheDocument();
  });

  test('Input component forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('Input component handles input correctly', () => {
    render(<Input placeholder="Type something..." />);
    const inputElement = screen.getByPlaceholderText('Type something...') as HTMLInputElement;

    inputElement.focus();
    inputElement.value = 'Hello World'
    expect(inputElement.value).toBe('Hello World');
  });
});
