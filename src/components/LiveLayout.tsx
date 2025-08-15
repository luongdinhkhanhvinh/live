interface LiveLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean; // New prop to enable full width layout
}

export default function LiveLayout({ children, fullWidth = false }: LiveLayoutProps) {
  // Simple layout without route-dependent logic to avoid hydration issues
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="container-content">
        {children}
      </div>
    </div>
  );
} 