import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume - Laznology",
};

export default function PlainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
