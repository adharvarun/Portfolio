"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Define routes where the Header should be hidden
  const hideHeaderRoutes = ["/studio", "/links"];
  const shouldHideHeader = hideHeaderRoutes.some((route) => pathname.startsWith(route));

  return !shouldHideHeader ? <Header /> : null;
}
