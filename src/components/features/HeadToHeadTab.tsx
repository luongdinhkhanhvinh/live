"use client";

export default function HeadToHeadTab() {
  return (
    <div className="h-full space-y-6 p-6">
      {/* Overall Record */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thống kê đối đầu</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">5 trận gần nhất</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>

      {/* Goals Scored */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bàn thắng ghi được</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>

      {/* Notable Matches */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Những trận đấu đáng nhớ</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>

      {/* Season Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thành tích mùa giải hiện tại</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>
    </div>
  );
} 