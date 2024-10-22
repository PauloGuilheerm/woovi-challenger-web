import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../components/ui';

describe('Label Component', () => {
  test('renders Label component with default props', () => {
    render(<Label htmlFor="input-id">Label Text</Label>);
    const labelElement = screen.getByText('Label Text');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'input-id');
  });

  test('renders Label component with custom className', () => {
    render(<Label className="custom-class" htmlFor="input-id">Label Text</Label>);
    const labelElement = screen.getByText('Label Text');
    expect(labelElement).toHaveClass('custom-class');
  });

  test('renders Label component with specific styles', () => {
    render(<Label className="text-red-500" htmlFor="input-id">Styled Label</Label>);
    const labelElement = screen.getByText('Styled Label');
    expect(labelElement).toHaveClass('text-red-500');
  });

  test('Label component forwards ref correctly', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref} htmlFor="input-id">Label Text</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  test('renders Label component as disabled correctly', () => {
    render(
      <Label className="peer-disabled:opacity-70" htmlFor="input-id" data-disabled>
        Disabled Label
      </Label>
    );
    const labelElement = screen.getByText('Disabled Label');
    expect(labelElement).toHaveClass('peer-disabled:opacity-70');
  });
});
