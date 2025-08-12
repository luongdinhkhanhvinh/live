"use client";

import { usePathname } from "next/navigation";

interface LiveLayoutProps {
  children: React.ReactNode;
}

export default function LiveLayout({ children }: LiveLayoutProps) {
  const pathname = usePathname();
  const isLivePage = pathname?.includes('/truc-tiep/');

  if (isLivePage) {
    // Smaller container for live pages - no banners but some margin
    return <div className="max-w-[1600px] mx-auto px-6">{children}</div>;
  }

  // Normal layout with banners for other pages
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Banner */}
        <aside className="col-span-2 hidden xl:block">
          <div className="sticky top-4">
            <div className="bg-gray-100 rounded-lg p-4 h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">📢</div>
                <div className="text-sm font-medium">Banner Trái</div>
                <div className="text-xs text-gray-400">160x600</div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="col-span-12 xl:col-span-8">
          <div className="container-content">
            {children}
          </div>
        </div>
        
        {/* Right Banner */}
        <aside className="col-span-2 hidden xl:block">
          <div className="sticky top-4">
            <div className="bg-gray-100 rounded-lg p-4 h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">📢</div>
                <div className="text-sm font-medium">Banner Phải</div>
                <div className="text-xs text-gray-400">160x600</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 