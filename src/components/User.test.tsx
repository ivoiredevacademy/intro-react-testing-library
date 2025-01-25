import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, it, describe, afterEach, vi, Mock,  } from 'vitest';
import '@testing-library/jest-dom/vitest'
import User from './User';


describe("User test", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the user name and email", async () => { 
    const mockUser = {
      name: "John Doe",
      email: "john.doe@exammple.com"
    };

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      json: async () => mockUser
    });

    render(<User />);

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

  });
})
