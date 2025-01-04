import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// PDF Styling CSS
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  subHeaderText: {
    fontSize: 13,
    marginTop: 5,
    color: "#555",
  },
  section: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  text: {
    marginBottom: 5,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  listItem: {
    marginBottom: 5,
    marginLeft: 10,
  },
  contactInfo: {
    marginTop: 5,
    fontSize: 13,
    color: "#555",
  },
});

// Change Spacing on Degree
const mapDegreeFormat = (degree: string) => {
  const degreeMap: { [key: string]: string } = {
    lessthanhighschool: "Less than High School",
    highschool: "High School",
    vocational: "Vocational",
    associatedegree: "Associate Degree",
    bachelordegree: "Bachelor Degree",
    masterdegree: "Master Degree",
    doctoratedegree: "Doctorate Degree",
  };
  return degreeMap[degree.toLowerCase()] || degree;
};

interface CVPDFProps {
  profile: {
    name: string;
    email: string;
    address: string;
    phone: string;
    summary: string;
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate?: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      graduationDate: string;
      description: string;
    }>;
  };
}

const CVPDF: React.FC<CVPDFProps> = ({ profile }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{profile.name}</Text>
        <Text style={styles.subHeaderText}>{profile.email} | {profile.phone}</Text>
        <Text style={styles.subHeaderText}>{profile.address}</Text>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.title}>Profile Summary</Text>
        <Text>{profile.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.title}>Work Experience</Text>
        {profile.experience.map((exp, idx) => (
          <View key={idx}>
            <Text style={styles.text}>
              {exp.position} at <Text style={styles.boldText}>{exp.company}</Text> ({exp.startDate} - {exp.endDate || "Present"})
            </Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.title}>Education</Text>
        {profile.education.map((edu, idx) => (
          <View key={idx}>
            <Text style={styles.text}>
              {mapDegreeFormat(edu.degree)} from <Text style={styles.boldText}>{edu.institution}</Text> (Graduated {edu.graduationDate})
            </Text>
            <Text style={styles.text}>{edu.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CVPDF;
