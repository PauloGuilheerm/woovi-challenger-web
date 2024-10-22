import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../components/ui/button"

describe("Button Component", () => {
  test("renders with default variant and size", () => {
    render(<Button>Default Button</Button>)
    const button = screen.getByText("Default Button")
    
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-primary text-primary-foreground")
    expect(button).toHaveClass("h-10 px-4 py-2")
  })

  test("renders with destructive variant", () => {
    render(<Button variant="destructive">Destructive Button</Button>)
    const button = screen.getByText("Destructive Button")
    
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-destructive text-destructive-foreground")
  })

  test("renders with large size", () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByText("Large Button")
    
    expect(button).toHaveClass("h-11 rounded-md px-8")
  })

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    
    const button = screen.getByText("Click Me")
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <span>Child Button</span>
      </Button>
    )
    const button = screen.getByText("Child Button")
    
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe("SPAN") // Verifica se o botão é um elemento 'span'
  })
})
