import { render } from '@testing-library/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../components/ui';

describe('Card Components', () => {
  test('renders Card component with given className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm custom-class');
  });

  test('renders CardHeader component with given className', () => {
    const { container } = render(<CardHeader className="header-class">Header</CardHeader>);
    expect(container.firstChild).toHaveClass('flex flex-col space-y-1.5 p-6 header-class');
  });

  test('renders CardTitle component with given className', () => {
    const { getByText } = render(<CardTitle className="title-class">Title</CardTitle>);
    expect(getByText('Title')).toHaveClass('text-2xl font-semibold leading-none tracking-tight title-class');
  });

  test('renders CardDescription component with given className', () => {
    const { getByText } = render(<CardDescription className="description-class">Description</CardDescription>);
    expect(getByText('Description')).toHaveClass('text-sm text-muted-foreground description-class');
  });

  test('renders CardContent component with given className', () => {
    const { container } = render(<CardContent className="content-class">Content</CardContent>);
    expect(container.firstChild).toHaveClass('p-6 pt-0 content-class');
  });

  test('renders CardFooter component with given className', () => {
    const { container } = render(<CardFooter className="footer-class">Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('flex items-center p-6 pt-0 footer-class');
  });
});
