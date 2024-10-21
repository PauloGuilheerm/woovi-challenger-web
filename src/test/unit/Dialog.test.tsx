import { render } from '@testing-library/react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../../components/ui';

const MockDialog = () => (
  <Dialog open={true}>
    <DialogOverlay className="overlay-class"  data-testid="overlay-class"/>
    <DialogContent className="content-class"  data-testid="dialog-content">
      <DialogHeader className="header-class" data-testid="header-content">
        <DialogTitle className="title-class" data-testid="title-content">Title</DialogTitle>
        <DialogDescription className="description-class" data-testid="description-content">Description</DialogDescription>
      </DialogHeader>
      <DialogFooter className="footer-class">
        <DialogClose data-testid="button-footer-content">Close</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

describe('Dialog Components', () => {
  test('renders Dialog component', () => {
    const { container } = render(<MockDialog />);
    expect(container).toBeInTheDocument();
  });

  test('renders DialogOverlay', () => {
    const { getByTestId } = render(<MockDialog />);
    const dialogOverlay = getByTestId('overlay-class');
    expect(dialogOverlay).toBeInTheDocument();
    expect(dialogOverlay).toHaveClass('fixed inset-0 z-50 bg-black/80 overlay-class');
  });

  test('renders DialogContent', () => {
    const { getByTestId } = render(<MockDialog />);
    const dialogContent = getByTestId('dialog-content');
    expect(dialogContent).toBeInTheDocument();
    expect(dialogContent).toHaveClass(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg content-class'
    );
  });
  
  test('renders DialogHeader', () => {
    const { getByTestId } = render(<MockDialog />);
    const headerContent = getByTestId('header-content');
    expect(headerContent).toBeInTheDocument();
    expect(headerContent).toHaveClass('flex flex-col space-y-1.5 text-center sm:text-left header-class');
  });

  test('renders DialogTitle', () => {
    const { getByText } = render(<MockDialog />);
    expect(getByText('Title')).toHaveClass('text-lg font-semibold leading-none tracking-tight title-class');
  });

  test('renders DialogDescription', () => {
    const { getByText } = render(<MockDialog />);
    expect(getByText('Description')).toHaveClass('text-sm text-muted-foreground description-class');
  });

  test('renders DialogClose button', () => {
    const { getByTestId } = render(<MockDialog />);
    const headerContent = getByTestId('button-footer-content');

    expect(headerContent).toBeInTheDocument();
  });
});
