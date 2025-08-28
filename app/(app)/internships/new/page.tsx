import { NewInternshipForm } from "@/components/(app)/internships/NewInternshipForm";

export default function NewInternshipPage() {
  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Create New Internship</h1>
        <p className="text-muted-foreground">Post a new internship opportunity to attract talented students</p>
      </div>
      
      <div className="max-w-4xl">
        <NewInternshipForm />
      </div>
    </div>
  );
}
