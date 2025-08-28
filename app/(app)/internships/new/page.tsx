export default function NewInternshipPage() {
  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Create New Internship</h1>
        <p className="text-muted-foreground">Post a new internship opportunity to attract talented students</p>
      </div>
      
      <div className="max-w-4xl">
        <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
          <div className="text-center">
            <div className="w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-muted-foreground/50">+</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Internship Form Coming Soon</h3>
            <p className="text-muted-foreground">
              The form to create new internship postings will be available here. 
              You&apos;ll be able to specify role details, requirements, and application process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
