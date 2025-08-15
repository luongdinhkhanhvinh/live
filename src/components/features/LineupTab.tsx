"use client";

export default function LineupTab() {
  return (
    <div className="h-full space-y-6 p-6">
      {/* Manchester United Formation */}
      <div className="bg-white dark:bg-custom-dark rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">Manchester United</h3>
        
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
        

      </div>

      {/* Liverpool Formation */}
      <div className="bg-white dark:bg-custom-dark rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Liverpool</h3>
        
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
        

      </div>

      {/* Substitutes */}
      <div className="bg-white dark:bg-custom-dark rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dự bị</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>
    </div>
  );
} 