export default function MusicProgressBar({ value, max, onChange }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={0}
        max={max || 0}
        step={0.1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="music-range"
        style={{
          background: `linear-gradient(to right, #f6d7b9 0%, #f6d7b9 ${percentage}%, rgba(255,255,255,0.18) ${percentage}%, rgba(255,255,255,0.18) 100%)`,
        }}
      />
    </div>
  );
}
