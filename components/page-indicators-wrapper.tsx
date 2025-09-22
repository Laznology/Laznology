"use client";

import dynamic from "next/dynamic";
const PageIndicators = dynamic(() => import("@/components/page-indicators"), {
  ssr: false,
});

export default function PageIndicatorsWrapper() {
  return <PageIndicators />;
}
