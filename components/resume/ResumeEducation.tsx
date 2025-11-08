import { Education } from "@/lib/types";
import React from "react";

const ResumeEducation = ({ education }: { education: Education[] }) => {
  return (
    <section className="max-w-5xl w-full mt-12">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Education</h2>
      <div className="grid gap-4">
        {education.map((edu) => (
          <div
            key={edu.degree + edu.university}
            className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-sm hover:shadow-indigo-500/20 transition-all"
          >
            <p className="font-medium text-white">{edu.degree}</p>
            <p className="text-gray-400">{edu.university}</p>
            <p className="text-gray-500 text-sm">{edu.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeEducation;
