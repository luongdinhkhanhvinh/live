"use client";

export default function CommentatorTab() {
  return (
    <div className="h-full space-y-6 p-6">
      {/* Commentator Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bình luận viên</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>

      {/* Live Commentary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bình luận trực tiếp</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>

      {/* Match Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sự kiện trận đấu</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
          </div>
        </div>
      </div>
    </div>
  );
} 