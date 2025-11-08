import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterProps {
  skills: string[];
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function ResumeFilters({
  skills,
  selectedSkill,
  setSelectedSkill,
  search,
  setSearch,
}: FilterProps) {
  return (
    <div className="space-y-5">
      {/* Skills */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 p-4">
        <h2 className="text-base font-semibold text-gray-200 mb-3">
          Filter by Skill
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Button
              key={skill}
              onClick={() =>
                setSelectedSkill(selectedSkill === skill ? null : skill)
              }
              className={`h-9 rounded-full border px-4 transition-all ${
                selectedSkill === skill
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {skill}
            </Button>
          ))}
          {selectedSkill && (
            <Button
              variant="outline"
              onClick={() => setSelectedSkill(null)}
              className="h-9 rounded-full text-gray-200 border-gray-600 hover:bg-white/10"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <Input
        type="text"
        placeholder="Search by company, role, or tech..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white/10 border-gray-600 inline text-white  placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
