import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITASO · Aprende, juega y comparte",
  description: "Un espacio para acompañarnos, aprender y disfrutar del cuidado cotidiano.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}{process.env.NODE_ENV === "development" && <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />}</body>
    </html>
  );
}
