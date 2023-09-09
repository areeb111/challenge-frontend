import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Before all, render <App> component
beforeEach(() => {
  render(<App />);
});

test('renders coding challege', () => {
  const linkElement = screen.getByText(/Coding Challenge/i);
  expect(linkElement).toBeInTheDocument();
});

// Test case to insert number in number input field
test('insert value in number input field', async () => {
  const inputNumber = screen.getByTestId('input-number')
  fireEvent.change(inputNumber, { target: { value: "10" } });
  inputNumber.value = 10
  expect(inputNumber.value).toBe('10')
});


// Test case to press the button of calculate with test id 'calculate-button'
test('press calculate button', async () => {
  const button = screen.getByTestId('calculate-button')
  expect(button).toBeInTheDocument()
  button.click()
  expect(button).toBeEnabled()
});

// Test case to check the result of the prime numbers and median
test('check the result of the prime numbers and median', async () => {
  const inputNumber = screen.getByTestId('input-number')
  expect(inputNumber).toBeInTheDocument()
  fireEvent.change(inputNumber, { target: { value: "10" } });
  expect(inputNumber).toHaveDisplayValue("10");
  const button = screen.getByTestId('calculate-button')
  expect(button).toBeInTheDocument()
  button.click()
  expect(button).toBeEnabled()

  await waitFor(() => {
    expect(screen.getByTestId('result')).toBeInTheDocument()
    expect(screen.getByTestId('prime-numbers')).toHaveTextContent('Prime numbers: 2, 3, 5, 7')
    expect(screen.getByTestId('median')).toHaveTextContent('Median: 3, 5')
  });

});