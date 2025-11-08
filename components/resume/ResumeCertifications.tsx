import { Certification } from "@/lib/types";

export default function ResumeCertifications({
  certifications,
}: {
  certifications?: Certification[];
}) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="max-w-5xl w-full mt-12">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center border-b border-gray-700 pb-2">
        Certifications
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-sm hover:shadow-indigo-500/20 transition-all"
          >
            <h3 className="text-lg font-medium text-white">{cert.title}</h3>
            <p className="text-gray-400">{cert.issuer}</p>
            <p className="text-gray-500 text-sm">{cert.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
