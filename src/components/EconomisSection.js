export default function EconomisSection({ data }) {
  return (
    <section className="py-12 bg-[#121212]">
      <div className="px-6 mb-6">
        <h2 className="font-[Oswald] text-2xl font-bold text-white uppercase">
          Paket Hemat
        </h2>
        <p className="text-sm text-gray-400">Solusi budget friendly.</p>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-2 gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-[#1A1A1A] border border-white/10 rounded flex flex-col justify-between"
            >
              <div>
                <div className="text-[#FFD700] text-xs font-bold mb-1">
                  {item.capacity}
                </div>
                <h4 className="text-white text-xs font-bold leading-snug">
                  {item.title
                    .replace("PAKET SERVICE ", "")
                    .replace(" HEMAT", "")}
                </h4>
              </div>
              <button className="mt-3 w-full text-[10px] font-bold py-1.5 bg-[#2D2D2D] text-white rounded hover:bg-[#FFD700] hover:text-black transition-colors">
                CEK HARGA
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
