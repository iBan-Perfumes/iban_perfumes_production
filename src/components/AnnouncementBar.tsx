export function AnnouncementBar() {
  const message = 'Super Saver Deal Live Now  –  Any 5 for ₹3,899';
  const items = Array(12).fill(message);

  return (
    <div className="bg-[#b91c1c] text-white py-2 overflow-hidden relative z-50">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="ticker-item text-xs sm:text-sm font-medium tracking-wide px-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
