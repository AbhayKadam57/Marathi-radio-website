export default function WaveformBar({ value = 0, max = 1, onChange = () => {} }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  const handleSeek = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    onChange(Number((ratio * max).toFixed(2)));
  };

  return (
    <div
      role="slider"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      onClick={handleSeek}
      className="w-full cursor-pointer"
    >
      <div className="mb-2 flex items-center justify-between font-[Inter] text-[10px] uppercase tracking-[0.18em] text-[#f5d6bc]/70">
        <span>{new Date(value * 1000).toISOString().slice(14, 19)}</span>
        <span>{new Date(max * 1000).toISOString().slice(14, 19)}</span>
      </div>

      <div className="relative h-1.5 w-full">
        <div className="absolute inset-0 rounded-full bg-[#120d0b]/70" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#f9e0c4]"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-[#f9e0c4] bg-[#f9e0c4] shadow-[0_0_0_2px_rgba(249,224,196,0.18)]"
          style={{ left: `calc(${percentage}% - 4px)` }}
        />
      </div>
    </div>
  );
}
