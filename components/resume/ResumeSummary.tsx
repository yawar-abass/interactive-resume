export default function ResumeSummary({ summary }: { summary?: string }) {
  if (!summary) return null;
  return (
    <section className="max-w-5xl w-full mb-10">
      <h2 className="text-2xl font-semibold text-gray-100 mb-3">Summary</h2>
      <p className="text-gray-300 leading-relaxed bg-white/10 backdrop-blur-xl border border-gray-700/40 rounded-2xl p-5 shadow-md">
        {summary}
      </p>
    </section>
  );
}
