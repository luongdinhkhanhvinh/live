interface LiveLayoutProps {
  children: React.ReactNode;
}

export default function LiveLayout({ children }: LiveLayoutProps) {
  // Simple layout without route-dependent logic to avoid hydration issues
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="container-content">
        {children}
      </div>
    </div>
  );
} 