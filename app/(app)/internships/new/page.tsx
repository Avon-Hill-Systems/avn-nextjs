import { NewInternshipForm } from "@/components/(app)/internships/NewInternshipForm";

export default function NewInternshipPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-normal text-foreground">Create New Internship</h1>
        <p className="text-muted-foreground">Post a new internship opportunity to attract talented students</p>
      </div>
      
      <div className="w-full max-w-4xl">
        <NewInternshipForm />
      </div>
    </div>
  );
}
