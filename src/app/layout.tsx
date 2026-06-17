import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shinkansen AI Swarm: Autonomous Disaster-Resilient Railway System",
  description: "Autonomous Disaster-Resilient Railway + Drone Swarm System - Project for FAR AWAY 2026 Hackathon",
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
