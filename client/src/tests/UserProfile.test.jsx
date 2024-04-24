import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from '../resources/store';
import UserProfile from '../components/UserProfile';
import { useNavigate } from 'react-router-dom';

jest.mock('../resources/store', () => ({
  useStore: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('UserProfile component', () => {
  test('renders user profile with username', async () => {
    useStore.mockReturnValueOnce('testuser');
    useStore.mockReturnValueOnce(true);

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("testuser's Voyages")).toBeInTheDocument();
    });
  });

  test('redirects to login if not logged in', async () => {
    useStore.mockReturnValueOnce('');
    useStore.mockReturnValueOnce(false);

    const navigate = jest.fn(); // Create a jest mock function
    require('react-router-dom').useNavigate.mockReturnValue(navigate); // Mock useNavigate to return the jest mock function

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    // Wait for redirection to '/'
    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/'); // Assert that navigate was called with the correct path
    });
  });

  test('renders message when no entries are present', async () => {
    useStore.mockReturnValueOnce('testuser');
    useStore.mockReturnValueOnce(true);
    useStore.mockReturnValueOnce([]);

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    // Wait for message to be present
    await waitFor(() => {
      expect(screen.getByText('No entries yet!')).toBeInTheDocument();
    });
  });

  test('redirects to "#" when "Start Journaling" button is clicked', async () => {
    useStore.mockReturnValueOnce('testuser');
    useStore.mockReturnValueOnce(true);
    useStore.mockReturnValueOnce([]);

    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    // Simulate a click on the "Start Journaling" button
    fireEvent.click(screen.getByText('Start Journaling'));

    // Assert that the correct navigation occurred
    expect(navigate).toHaveBeenCalledWith('/#');
  });
});