import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 240,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  recipient: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  details: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    marginTop: 40,
    textAlign: "center",
    color: "gray",
  },
});

interface CertificatePDFProps {
  profile: {
    name: string;
  };
  certificates: Array<{
    logo: string;
    uniqueId: string; // Adjusted key
    name: string; // Adjusted key
    issuer: string; // Adjusted key
    date: string; // Adjusted key
    skillName: string; // Adjusted key
  }>;
}

const CertificatePDF: React.FC<CertificatePDFProps> = ({
  profile,
  certificates,
}) => {
  console.log(certificates, "THOMMY2.0");
  return (
    <Document>
      {certificates.map((certificate, index) => (
        <Page size="A4" style={styles.page} orientation="landscape" key={index}>
          <View style={{ width: "100%", textAlign: "center" }}>
            <Image src="/logo/PATHWAYLOGOPNG.png" style={styles.logo} />
            <Text style={styles.title}>Certificate of Achievement</Text>
            <Text style={styles.recipient}>This is to certify that</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              {profile.name}
            </Text>
            <Text style={styles.details}>
              has successfully demonstrated proficiency in
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              {certificate.skillName}
            </Text>
            <Text style={styles.details}>
              Issued on: {new Date(certificate.date).toLocaleDateString()}
            </Text>
            <Text style={styles.details}>Issued by: {certificate.issuer}</Text>
            <Text style={styles.footer}>
              Certificate ID: {certificate.uniqueId}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default CertificatePDF;
