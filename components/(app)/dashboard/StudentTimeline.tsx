"use client";

import Link from "next/link";
import { useCurrentUserQuery, useResumeQuery, useStudentProfileQuery } from "@/lib/api-service";

export function StudentTimeline() {
  const { data: currentUser } = useCurrentUserQuery();
  const userId = currentUser?.id;
  const { data: profile } = useStudentProfileQuery(userId);
  const { data: resume } = useResumeQuery(userId);

  const hasProfile = Boolean(profile);
  const hasResume = Boolean(resume);
  const isFirstStepCompleted = hasProfile && hasResume;

  const timelineSteps = [
    {
      number: 1,
      title: "Fill out your profile and upload your CV",
      description: isFirstStepCompleted ? (
        "Profile and CV completed! You're now eligible for interviews."
      ) : (
        <>
          <strong>This step is crucial</strong> - you must complete your profile information and upload your resume to be eligible for interviews. Startups need to see your full profile before they can invite you.
          <br /><br />
          <Link href="/profile" className="text-primary hover:underline inline-flex items-center">
            Go to your profile →
          </Link>
        </>
      ),
      completed: isFirstStepCompleted
    },
    {
      number: 2,
      title: "Receive your first round interview invitation",
      description: "We'll reach out via email to schedule your interview based on startup interest. The interview lasts 30 minutes and there's nothing to prepare - just be yourself!"
    },
    {
      number: 3,
      title: "Meet with your startup matches",
      description: "You'll get matched to startups interested in you and can see their internship posts. You'll have each other's contact information to set up meetings and discuss opportunities directly."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="space-y-8">
          {timelineSteps.map((step, index) => (
            <div key={step.number} className="flex items-start space-x-4 relative">
              {/* Step circle */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center relative z-10">
                {step.completed ? (
                  <div className="w-8 h-8 bg-green-600/80 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-transparent border-2 border-black rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-black">{step.number}</span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className={`text-lg font-normal ${step.completed ? 'text-muted-foreground/60' : 'text-foreground'} mb-2`}>
                  {step.title}
                </h3>
                <div className={`text-sm ${step.completed ? 'text-muted-foreground/50' : 'text-muted-foreground'} leading-relaxed`}>
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
