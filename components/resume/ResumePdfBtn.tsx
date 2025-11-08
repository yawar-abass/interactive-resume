"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/resume/ResumePrint";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/lib/types";

export default function ResumePDFButton({ resume }: { resume: ResumeData }) {
  return (
    <PDFDownloadLink
      document={<ResumePDF resume={resume} />}
      fileName={`${resume.name}_Resume.pdf`}
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
  );
}
