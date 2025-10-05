'use client';
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-700 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-yellow-700 text-2xl">ॐ</span>
        </div>
      </div>
    </div>
  )
}