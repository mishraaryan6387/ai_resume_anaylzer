import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedBack for the your dream job!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  },[auth.isAuthenticated])


  
  return (
    <main className="min-h-screen overflow-x-hidden bg-[url('/images/bg-main.svg')] bg-cover px-4 sm:px-6 lg:px-8">
      <NavBar />
      <section className="main-section mx-0 px-0 pt-10 sm:mx-4 sm:pt-12 lg:mx-15">
        <div className="page-heading max-w-3xl gap-4 sm:gap-6 lg:max-w-4xl lg:gap-8">
          <h1 className="!text-4xl sm:text-5xl! lg:!text-6xl">
            Track your Applications  Resume Ratings
          </h1>
          <h2 className="!text-xl sm:!text-2xl lg:text-3xl!">
            Review your Submissions and check AI-powered feedback.
          </h2>
        </div>  
      </section>

      {resumes.length > 0 && (
        <div className="resumes-section grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:flex [&_.resume-card]:w-full [&_.resume-card]:max-w-[490px]">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
