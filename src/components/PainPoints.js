export default function PainPoints() {
  const points = [
    "Engine overheat tiba-tiba",
    "Tenaga hidrolik melemah",
    "Undercarriage berbunyi",
    "Sparepart susah dicari",
  ];

  return (
    <section className="px-6 py-12 bg-[#1E1E1E] relative border-b border-white/5">
      <h2 className="font-[Oswald] text-2xl font-bold text-white uppercase mb-6">
        Tanda Bahaya <span className="text-[#FFD700]">Di Site</span>
      </h2>
      <div className="space-y-3">
        {points.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded bg-[#2D2D2D] p-4 border-l-4 border-[#FFD700]"
          >
            <span className="text-[#FFD700] font-bold">⚠️</span>
            <span className="text-gray-200 text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
