"use client";

import { Button } from "@/components/ui/button";
import { FilterMode } from "@/lib/types";

interface ResumeFiltersProps {
  skills: string[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
}

export default function ResumeFilters({
  skills,
  selectedSkills,
  setSelectedSkills,
  filterMode,
  setFilterMode,
}: ResumeFiltersProps) {
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const clearSkills = () => setSelectedSkills([]);

  return (
    <div className="space-y-5">
      {/* Skill Filters */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-gray-700/40 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-200 mb-2 sm:mb-0">
            Filter by Skills
          </h2>

          {/* AND / OR Toggle */}
          <div
            role="group"
            aria-label="Filter mode"
            className="flex items-center bg-white/10 backdrop-blur-xl border border-gray-700/40 rounded-xl p-1"
          >
            {(["AND", "OR"] as FilterMode[]).map((mode) => (
              <Button
                key={mode}
                variant="ghost"
                onClick={() => setFilterMode(mode)}
                className={`rounded-lg px-4 text-sm font-medium transition-all ${
                  filterMode === mode
                    ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {mode === "AND" ? "Match All" : "Match Any"}
              </Button>
            ))}
          </div>
        </div>

        {/* Skill Buttons */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`h-9 rounded-full border px-4 transition-all ${
                selectedSkills.includes(skill)
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {skill}
            </Button>
          ))}
          {selectedSkills.length > 0 && (
            <Button
              variant="outline"
              onClick={clearSkills}
              className={`h-9 rounded-full  border-gray-600 hover:bg-white/10  text-black hover:text-red-600`}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="text-xs bg-white/10 border border-gray-700/50 px-3 py-1 rounded-full text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
