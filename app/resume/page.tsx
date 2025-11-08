"use client";

import { useState, useEffect, useMemo } from "react";
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
import { ResumePDF } from "@/components/resume/ResumePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function ResumePage() {
  const router = useRouter();

  // State management
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>("OR");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ResumeView>("cards");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
  }, [router]);

  // ✅ Normalize data: merge experiences and projects into a common structure
  const combinedData: ResumeItem[] = useMemo(() => {
    const experiences: ResumeItem[] = resumeData.experience.map((exp) => ({
      type: "experience",
      title: exp.role,
      organization: exp.company,
      duration: exp.duration,
      description: exp.description,
      tech: [],
    }));

    const projects: ResumeItem[] = (resumeData.projects || []).map((proj) => ({
      type: "project",
      title: proj.name,
      organization: "Personal Project",
      duration: "",
      description: proj.description,
      tech: proj.tech || [],
    }));

    return [...experiences, ...projects];
  }, []);

  // ✅ Filtering logic: search + multi-skill + AND/OR
  const filteredItems = useMemo(() => {
    return combinedData.filter((item) => {
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
          (item.tech && item.tech.some((t) => t.toLowerCase().includes(lower)))
        );
      });

      const skillMatch =
        filterMode === "AND"
          ? skillMatches.every(Boolean)
          : skillMatches.some(Boolean);

      return matchSearch && skillMatch;
    });
  }, [combinedData, selectedSkills, filterMode, search]);

  // const handleDownload = () => window.print();

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
          {/* <Button onClick={handleDownload}>Download Resume</Button> */}
          <PDFDownloadLink
            document={<ResumePDF resume={resumeData} />}
            fileName={`${resumeData.name}_Resume.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button disabled>Preparing PDF...</Button>
              ) : (
                <Button className="rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-md cursor-pointer hover:shadow-purple-500/30 transition-all">
                  Download Resume
                </Button>
              )
            }
          </PDFDownloadLink>
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="rounded-xl"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Filters */}
      <section className="max-w-5xl w-full mb-8 space-y-6">
        <ResumeFilters
          skills={resumeData.skills}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          search={search}
          setSearch={setSearch}
          filterMode={filterMode}
          setFilterMode={setFilterMode}
        />
        <ResumeViewToggle view={view} setView={setView} />
      </section>

      {/* Combined Experience + Projects */}
      <section className="max-w-5xl w-full transition-all duration-300 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
          Experience & Projects
        </h2>

        {view === "cards" && <ResumeCardList data={filteredItems} />}
        {view === "timeline" && <ResumeTimeline data={filteredItems} />}
        {view === "table" && <ResumeTable data={filteredItems} />}

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No matching results found.
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
