import { ResumeItem } from "@/lib/types";

export default function ResumeTable({ data }: { data: ResumeItem[] }) {
  if (data.length === 0)
    return <p className="text-gray-400 text-center">No experience found.</p>;

  return (
    <div className="overflow-x-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 shadow-md">
      <table className="min-w-full text-left text-gray-300 text-sm">
        <thead className="bg-white/5 border-b border-gray-700/40 text-gray-200 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Duration</th>
            <th className="px-6 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((exp, i) => (
            <tr
              key={i}
              className="border-b border-gray-800 hover:bg-white/10 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-white">{exp.title}</td>
              <td className="px-6 py-4">{exp.organization}</td>
              <td className="px-6 py-4 text-gray-400">{exp.duration}</td>
              <td className="px-6 py-4">{exp.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
