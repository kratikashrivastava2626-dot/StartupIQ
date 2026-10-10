import { startupData } from "@/lib/data";
import { notFound } from "next/navigation";
import ProfileClient from "./ProfileClient";

export function generateStaticParams() {
  return startupData.map((startup) => ({
    id: startup.Startup_ID,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const startup = startupData.find((s) => s.Startup_ID === resolvedParams.id);
  if (!startup) return { title: "Startup Not Found | StartupIQ" };
  return {
    title: `${startup.Startup_Name} Profile | StartupIQ`,
  };
}

export default async function StartupProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const startup = startupData.find((s) => s.Startup_ID === resolvedParams.id);
  
  if (!startup) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ProfileClient startup={startup} />
    </div>
  );
}
