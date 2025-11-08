"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import resumeData from "@/data/resume.json";
import { isLoggedIn, logout } from "@/lib/auth";
import ResumeFilters from "@/components/resume/ResumeFilters";
import ResumeViewToggle from "@/components/resume/ResumeViewToggle";
import ResumeCardList from "@/components/resume/ResumeCardList";
import ResumeTimeline from "@/components/resume/ResumeTimeline";
import ResumeTable from "@/components/resume/ResumeTable";
import Footer from "@/components/layout/Footer";
import ResumeEducation from "@/components/resume/ResumeEducation";
import ResumeCertifications from "@/components/resume/ResumeCertifications";
import ResumeAwards from "@/components/resume/ResumeAwards";
import { Button } from "@/components/ui/button";
import { FilterMode, ResumeView, ResumeItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import ResumeSummary from "@/components/resume/ResumeSummary";
// import ResumePDFButton from "@/components/resume/ResumePdfBtn";
import dynamic from "next/dynamic";

export default function ResumePage() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>("OR");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ResumeView>("cards");

  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
  }, [router]);

  const ResumePDFButton = useMemo(
    () =>
      dynamic(
        () =>
          import("@/components/resume/ResumePdfBtn").then((mod) => mod.default),
        { ssr: false }
      ),
    []
  );

  // Filtering
  const filterSection = useCallback(
    (items: ResumeItem[]) => {
      return items.filter((item) => {
        const searchTerm = search.toLowerCase();

        const matchSearch =
          item.title.toLowerCase().includes(searchTerm) ||
          (item.organization?.toLowerCase().includes(searchTerm) ?? false) ||
          item.description.toLowerCase().includes(searchTerm) ||
          (item.tech &&
            item.tech.some((t) => t.toLowerCase().includes(searchTerm)));

        if (selectedSkills.length === 0) return matchSearch;

        const skillMatches = selectedSkills.map((skill) => {
          const lower = skill.toLowerCase();
          return (
            item.description.toLowerCase().includes(lower) ||
            (item.tech &&
              item.tech.some((t) => t.toLowerCase().includes(lower)))
          );
        });

        const skillMatch =
          filterMode === "AND"
            ? skillMatches.every(Boolean)
            : skillMatches.some(Boolean);

        return matchSearch && skillMatch;
      });
    },
    [search, selectedSkills, filterMode]
  );

  // Create normalized arrays
  const experiences: ResumeItem[] = useMemo(
    () =>
      resumeData.experience.map((exp) => ({
        type: "experience",
        title: exp.role,
        organization: exp.company,
        duration: exp.duration,
        description: exp.description,
        tech: [],
      })),
    []
  );

  const projects: ResumeItem[] = useMemo(
    () =>
      (resumeData.projects || []).map((proj) => ({
        type: "project",
        title: proj.name,
        organization: "Personal Project",
        duration: "",
        description: proj.description,
        tech: proj.tech || [],
      })),
    []
  );

  const filteredExperience = useMemo(
    () => filterSection(experiences),
    [filterSection, experiences]
  );

  const filteredProjects = useMemo(
    () => filterSection(projects),
    [filterSection, projects]
  );

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-linear-to-r from-gray-900 via-slate-900 to-black text-white overflow-hidden px-6 py-12">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-[300px] w-[300px] bg-indigo-500/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 h-[300px] w-[300px] bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {resumeData.name}
        </h1>
        <p className="text-gray-300 mt-2 text-lg">{resumeData.title}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <ResumePDFButton resume={resumeData} />
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="rounded-xl cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </div>

      <ResumeSummary summary={resumeData.summary} />

      <section className="max-w-5xl w-full mb-8 space-y-6">
        {/* Filters and controls container */}
        <div className="flex flex-col gap-4">
          {/* Filters */}
          <ResumeFilters
            skills={resumeData.skills}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Input
              type="text"
              placeholder="Search by company, role, or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/10 border-gray-600  inline text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
            />

            <ResumeViewToggle view={view} setView={setView} />
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section className="max-w-5xl w-full transition-all duration-300 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center border-b border-gray-700 pb-2">
          Experience
        </h2>

        {view === "cards" && <ResumeCardList data={filteredExperience} />}
        {view === "timeline" && <ResumeTimeline data={filteredExperience} />}
        {view === "table" && <ResumeTable data={filteredExperience} />}

        {filteredExperience.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No experience matches found.
          </p>
        )}
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section className="max-w-5xl w-full mt-12 transition-all duration-300 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center border-b border-gray-700 pb-2">
          Projects
        </h2>

        {view === "cards" && <ResumeCardList data={filteredProjects} />}
        {view === "timeline" && <ResumeTimeline data={filteredProjects} />}
        {view === "table" && <ResumeTable data={filteredProjects} />}

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No projects match the filters.
          </p>
        )}
      </section>

      {/* Education */}
      <ResumeEducation education={resumeData.education} />

      {/* Certifications */}
      <ResumeCertifications certifications={resumeData.certifications} />

      {/* Awards */}
      <ResumeAwards awards={resumeData.awards} />

      <Footer />
    </main>
  );
}
