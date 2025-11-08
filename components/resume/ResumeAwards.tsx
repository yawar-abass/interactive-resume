import { Award } from "@/lib/types";

export default function ResumeAwards({ awards }: { awards?: Award[] }) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="max-w-5xl w-full mt-12">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Awards</h2>
      <div className="grid gap-4">
        {awards.map((award) => (
          <div
            key={award.name}
            className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-sm hover:shadow-purple-500/20 transition-all"
          >
            <h3 className="text-lg font-medium text-white">{award.name}</h3>
            <p className="text-gray-400">{award.year}</p>
            <p className="text-gray-300 mt-2">{award.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
