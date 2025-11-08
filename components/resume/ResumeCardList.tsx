import { ResumeItem } from "@/lib/types";

export default function ResumeCardList({ data }: { data: ResumeItem[] }) {
  if (data.length === 0)
    return <p className="text-gray-400 text-center">No items found.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((item, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-md hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <span className="text-xs uppercase text-indigo-400 font-semibold">
              {item.type}
            </span>
          </div>
          {item.organization && (
            <p className="text-gray-400 text-sm mb-1">{item.organization}</p>
          )}
          {item.duration && (
            <p className="text-gray-500 text-xs mb-3">{item.duration}</p>
          )}
          <p className="text-gray-300 leading-relaxed mb-2">
            {item.description}
          </p>
          {item.tech && (
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
