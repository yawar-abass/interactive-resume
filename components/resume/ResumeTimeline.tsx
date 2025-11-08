export default function ResumeTimeline({ data }: { data: any[] }) {
  if (data.length === 0)
    return <p className="text-gray-400 text-center">No experience found.</p>;

  return (
    <ol className="relative border-l border-gray-700/60 ml-3">
      {data.map((exp, i) => (
        <li key={i} className="mb-8 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 ring-4 ring-gray-900"></span>
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 p-5 shadow-sm hover:shadow-indigo-500/20 transition-all hover:translate-x-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {exp.role}
              </h3>
              <p className="text-xs md:text-sm text-gray-400">{exp.duration}</p>
            </div>
            <p className="text-sm text-gray-400 mt-0.5">{exp.company}</p>
            <p className="text-gray-300 mt-3 leading-relaxed">
              {exp.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
