"use client";

import { useEffect } from "react";
import LandingPage from "@/app/LandingPage/LandingPage";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation"; // Correct hook for Next.js App Router

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null; // Prevent rendering before redirect

  return <LandingPage />;
}