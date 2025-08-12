"use client";

export default function StatsTab() {
  return (
    <div className="h-full space-y-6 p-6">
      {/* Match Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thông tin trận đấu</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Giải đấu:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">Premier League 2024/25</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Vòng:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">Vòng 15</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Sân vận động:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">Old Trafford</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Trọng tài:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">Michael Oliver</span>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Tỷ số</h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Manchester United</div>
          </div>
          <div className="text-3xl font-bold text-gray-400 dark:text-gray-500">-</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Liverpool</div>
          </div>
        </div>
      </div>

      {/* Match Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thống kê trận đấu</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Sút bóng</span>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">12</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-red-600 font-medium">8</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Sút trúng đích</span>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">5</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <span className="text-red-600 font-medium">3</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Kiểm soát bóng</span>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">58%</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
              <span className="text-red-600 font-medium">42%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Phạt góc</span>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">6</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <span className="text-red-600 font-medium">3</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Thẻ vàng</span>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">2</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <span className="text-red-600 font-medium">1</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Thẻ đỏ</span>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">0</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="text-red-600 font-medium">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lineups */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Đội hình xuất phát</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Manchester United</h4>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <div>1. David de Gea (GK)</div>
              <div>2. Aaron Wan-Bissaka</div>
              <div>5. Harry Maguire</div>
              <div>6. Lisandro Martínez</div>
              <div>23. Luke Shaw</div>
              <div>18. Casemiro</div>
              <div>8. Bruno Fernandes</div>
              <div>10. Marcus Rashford</div>
              <div>25. Jadon Sancho</div>
              <div>9. Anthony Martial</div>
              <div>11. Mason Greenwood</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-red-600 mb-2">Liverpool</h4>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <div>1. Alisson (GK)</div>
              <div>66. Trent Alexander-Arnold</div>
              <div>4. Virgil van Dijk</div>
              <div>5. Ibrahima Konaté</div>
              <div>26. Andy Robertson</div>
              <div>3. Fabinho</div>
              <div>14. Jordan Henderson</div>
              <div>8. Naby Keïta</div>
              <div>11. Mohamed Salah</div>
              <div>9. Roberto Firmino</div>
              <div>10. Sadio Mané</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 