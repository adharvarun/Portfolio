"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/studio", "/links", "/terminal"];
  const shouldHideHeader = hideHeaderRoutes.some((route) => pathname.startsWith(route));

  return !shouldHideHeader ? <Header /> : null;
}
