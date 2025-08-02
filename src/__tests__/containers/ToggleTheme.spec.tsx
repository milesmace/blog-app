import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeContainer } from '@/containers';
import { ThemeConfig } from '@/containers/ThemeToggle/ThemeToggle.config';

describe('ThemeContainer', () => {
  it('renders the theme toggle button', () => {
    render(<ThemeContainer />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('displays correct icons for light and dark modes', () => {
    render(<ThemeContainer />);
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('lucide-sun'),
    );
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('lucide-moon'),
    );
  });

  it('opens the dropdown when clicked', async () => {
    render(<ThemeContainer />);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    ThemeConfig.forEach(async (theme) => {
      const item = screen.getByText(theme.label);
      expect(item).toBeInTheDocument();
    });
  });

  it('has proper accessibility roles and labels', () => {
    render(<ThemeContainer />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveAccessibleName('Toggle theme');
  });
});
