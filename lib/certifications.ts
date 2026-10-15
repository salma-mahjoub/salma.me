export type Certification = {
  title: string;
  issuer: string;
  /** e.g. "Sep 2026" */
  date: string;
  /** Badge image under /public/certs */
  image: string;
  /** Public badge link (Credly). Preferred over the PDF when set. */
  verifyUrl?: string;
  /** Certificate PDF under /public/certs/pdf, opened in a new tab. */
  certificate?: string;
};

export const certifications: Certification[] = [
  {
    title: "Hedera Certified Developer Associate (HCDA)",
    issuer: "The Hashgraph Association",
    date: "Oct 2026",
    image: "/certs/hedera-hcda.png",
    certificate: "/certs/pdf/hedera-hcda.pdf",
  },
  {
    title: "Hedera Business Foundation (HBF)",
    issuer: "The Hashgraph Association",
    date: "Oct 2026",
    image: "/certs/hedera-hbf.png",
    certificate: "/certs/pdf/hedera-hbf.pdf",
  },
  {
    title: "Hedera Certified Foundation (HCF)",
    issuer: "The Hashgraph Association",
    date: "Oct 2026",
    image: "/certs/hedera-hcf.png",
    certificate: "/certs/pdf/hedera-hcf.pdf",
  },
  {
    title: "AWS Academy Graduate: Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "Sep 2026",
    image: "/certs/aws-cloud-foundations.png",
    verifyUrl: "https://www.credly.com/badges/e80e8d14-2886-4afc-9314-308f1149e081/public_url",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco",
    date: "Aug 2025",
    image: "/certs/cisco-intro-modern-ai.png",
    verifyUrl: "https://www.credly.com/badges/6f726bf1-956a-47e8-a0fa-c63f8829218a/public_url",
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    date: "Jul 2025",
    image: "/certs/cisco-ccna-srwe.png",
    verifyUrl: "https://www.credly.com/badges/f4ffbd69-a367-4c34-9825-10d49810197a/public_url",
  },
];
