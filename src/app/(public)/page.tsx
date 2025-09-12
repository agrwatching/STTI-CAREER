// src/app/(public)/page.tsx
import Hero from "@/components/beranda/Hero";
import Job from "@/components/beranda/Job";
import Company from "@/components/beranda/Company";
import Review from "@/components/beranda/Review";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50">
      <Hero />
      <Job />
      <Review />
      <Company />
    </main>
  );
}
