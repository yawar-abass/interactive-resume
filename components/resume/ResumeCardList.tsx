import { Experience } from "@/lib/types";

export default function ResumeCardList({ data }: { data: Experience[] }) {
  if (data.length === 0)
    return <p className="text-gray-400 text-center">No experience found.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((exp, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-md hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <h3 className="text-2xl font-semibold text-white mb-1">{exp.role}</h3>
          <p className="text-gray-400 text-sm mb-2">
            {exp.company} — {exp.duration}
          </p>
          <p className="text-gray-300 leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>
  );
}
