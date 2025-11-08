import { Project } from "@/lib/types";

export default function ResumeProjects({ projects }: { projects?: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="max-w-5xl w-full mt-12">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((proj) => (
          <div
            key={proj.name}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-md hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-white">{proj.name}</h3>
            <p className="text-sm text-gray-400 mt-1">
              Tech: {proj.tech.join(", ")}
            </p>
            <p className="text-gray-300 mt-3 leading-relaxed">
              {proj.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
