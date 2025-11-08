import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1f2937",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  title: {
    fontSize: 12,
    color: "#4b5563",
  },
  section: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#111827",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 11.5,
    color: "#111827",
  },
  company: {
    fontSize: 11,
    color: "#4b5563",
    fontStyle: "italic",
  },
  duration: {
    fontSize: 10,
    color: "#6b7280",
  },
  text: {
    fontSize: 10.5,
    color: "#1f2937",
    marginTop: 2,
  },
  tech: {
    color: "#4338ca",
    fontSize: 10,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skill: {
    backgroundColor: "#e0e7ff",
    color: "#1e3a8a",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 9.5,
    marginRight: 4,
    marginBottom: 3,
  },
});

export const ResumePDF = ({ resume }: { resume: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.title}>{resume.title}</Text>
      </View>

      {/* ===== Experience ===== */}
      {resume.experience && resume.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.line}>
                <Text style={styles.jobTitle}>
                  {exp.role} <Text style={styles.company}>— {exp.company}</Text>
                </Text>
                <Text style={styles.duration}>{exp.duration}</Text>
              </View>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ===== Projects ===== */}
      {resume.projects && resume.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resume.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.line}>
                <Text style={styles.jobTitle}>{proj.name}</Text>
                {proj.tech && (
                  <Text style={styles.tech}>{proj.tech.join(", ")}</Text>
                )}
              </View>
              <Text style={styles.text}>{proj.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ===== Education ===== */}
      {resume.education && resume.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu, i) => (
            <View key={i} style={styles.line}>
              <Text style={styles.jobTitle}>
                {edu.degree} — {edu.university}
              </Text>
              <Text style={styles.duration}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ===== Skills ===== */}
      {resume.skills && resume.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {resume.skills.map((skill, i) => (
              <Text key={i} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);
