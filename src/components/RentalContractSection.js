export default function RentalContractSection({ rental, contract }) {
  return (
    <section className="py-12 bg-[#000000]">
      {/* RENTAL */}
      <div className="px-6 mb-10">
        <h2 className="font-[Oswald] text-2xl font-bold text-white uppercase mb-4">
          Rental Unit Ready
        </h2>
        <div className="space-y-4">
          {rental.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#1E1E1E] p-4 rounded border-l-4 border-blue-500"
            >
              <div className="flex-1">
                <h4 className="text-white font-bold">{item.title}</h4>
                <p className="text-xs text-gray-400">
                  Unit tahun muda & siap kerja
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTRACT */}
      <div className="px-6">
        <h2 className="font-[Oswald] text-2xl font-bold text-white uppercase mb-4">
          Contract Service
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {contract.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFD700] p-2 py-4 rounded text-center text-black"
            >
              <div className="text-2xl font-bold font-[Oswald]">
                {item.title
                  .replace("CONTRACT SERVICE ", "")
                  .replace(" BULAN", "")}
              </div>
              <div className="text-xs font-bold uppercase">Bulan</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
