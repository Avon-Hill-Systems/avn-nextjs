import InterviewNoteForm from "@/components/(app)/interviews/InterviewNoteForm";

export default function InterviewsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Interviews</h1>
        <p className="text-muted-foreground">Admin-only interviews management.</p>
      </div>
      <InterviewNoteForm />
    </div>
  );
}
