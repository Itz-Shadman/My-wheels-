export default function Spinner({ size = 16 }) {
  // spinner 
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="animate-spin rounded-full border-t-4 border-b-4 border-blue-600 h-16 w-16"
        style={{ width: size * 4, height: size * 4 }}
      ></div>
    </div>
  );
}
