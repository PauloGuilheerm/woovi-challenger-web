type LoadingSpinnerProps = {
  className?: string;
}
export default function LoadingSpinner({ className } : LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-gray-500"></div>
    </div>
  );
}
