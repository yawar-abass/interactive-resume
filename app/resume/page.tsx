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
import { Button } from "@/components/ui/button";
import { Experience } from "@/lib/types";

type ViewMode = "cards" | "timeline" | "table";

export default function ResumePage() {
  const router = useRouter();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("cards");

  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
  }, [router]);

  const filteredExperience = useMemo(() => {
    return resumeData.experience.filter((exp: Experience) => {
      const matchSkill = selectedSkill
        ? exp.description.toLowerCase().includes(selectedSkill.toLowerCase())
        : true;
      const matchSearch =
        exp.role.toLowerCase().includes(search.toLowerCase()) ||
        exp.company.toLowerCase().includes(search.toLowerCase()) ||
        exp.description.toLowerCase().includes(search.toLowerCase());
      return matchSkill && matchSearch;
    });
  }, [selectedSkill, search]);

  const handleDownload = () => window.print();

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden px-6 py-12">
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
          <Button
            onClick={handleDownload}
            className="rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-md hover:shadow-purple-500/30 transition-all"
          >
            Download Resume
          </Button>
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
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          search={search}
          setSearch={setSearch}
        />
        <ResumeViewToggle view={view} setView={setView} />
      </section>

      {/* Experience */}
      <section className="max-w-5xl w-full transition-all duration-300 animate-fadeIn">
        {view === "cards" && <ResumeCardList data={filteredExperience} />}
        {view === "timeline" && <ResumeTimeline data={filteredExperience} />}
        {view === "table" && <ResumeTable data={filteredExperience} />}
      </section>

      {/* Education */}
      <ResumeEducation education={resumeData.education} />

      <Footer />
    </main>
  );
}
