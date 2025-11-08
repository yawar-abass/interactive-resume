import { ResumeData } from "@/lib/types";

export default function ResumePrint({ resume }: { resume: ResumeData }) {
  return (
    <div className="print-resume font-sans text-gray-900 bg-white p-10 max-w-5xl mx-auto">
      {/* ===== Header ===== */}
      <header className="border-b border-gray-300 pb-3 mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{resume.name}</h1>
        <p className="text-gray-600 text-lg">{resume.title}</p>
      </header>

      {/* ===== Two-column layout ===== */}
      <div className="grid grid-cols-3 gap-8">
        {/* ==== Left Column ==== */}
        <aside className="col-span-1 space-y-6">
          {/* Profile */}
          {resume.summary && (
            <section>
              <h2 className="text-base font-semibold border-b border-gray-200 pb-1 mb-2">
                Profile
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {resume.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {resume.skills && resume.skills.length > 0 && (
            <section>
              <h2 className="text-base font-semibold border-b border-gray-200 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1 text-sm text-gray-700">
                {resume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resume.education && (
            <section>
              <h2 className="text-base font-semibold border-b border-gray-200 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {resume.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>{edu.degree}</span>
                      <span className="text-gray-500 text-xs">{edu.year}</span>
                    </div>
                    <p className="text-xs text-gray-600">{edu.university}</p>
                    {edu.details && (
                      <p className="text-xs text-gray-700 mt-0.5">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <section>
              <h2 className="text-base font-semibold border-b border-gray-200 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="text-sm text-gray-700 space-y-1">
                {resume.certifications.map((cert, i) => (
                  <li key={i}>
                    <div className="flex justify-between items-center text-sm">
                      <strong>{cert.title}</strong>
                      <span className="text-gray-500 text-xs">{cert.year}</span>
                    </div>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Awards */}
          {resume.awards && resume.awards.length > 0 && (
            <section>
              <h2 className="text-base font-semibold border-b border-gray-200 pb-1 mb-2">
                Awards
              </h2>
              <ul className="text-sm text-gray-700 space-y-1">
                {resume.awards.map((award, i) => (
                  <li key={i}>
                    <div className="flex justify-between items-center text-sm">
                      <strong>{award.name}</strong>
                      <span className="text-gray-500 text-xs">
                        {award.year}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{award.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* ==== Right Column ==== */}
        <main className="col-span-2 space-y-8">
          {/* Experience */}
          {resume.experience && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>{exp.role}</span>
                      <span className="text-gray-500 text-xs">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span>{exp.company}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {resume.projects && resume.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-4">
                {resume.projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>{proj.name}</span>
                      {proj.tech && (
                        <span className="text-xs text-gray-500">
                          {proj.tech.join(", ")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
