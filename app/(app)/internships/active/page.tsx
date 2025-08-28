export default function ActiveInternshipsPage() {
  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Active Internships</h1>
        <p className="text-muted-foreground">Manage your current internship postings and view applications</p>
      </div>
      
      <div className="max-w-4xl">
        <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
          <div className="text-center">
            <div className="w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-muted-foreground/50">📋</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Active Postings Yet</h3>
            <p className="text-muted-foreground">
              When you create internship postings, they will appear here for you to manage. 
              You'll be able to view applications, update details, and track student interest.
            </p>
            <a 
              href="/internships/new" 
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors mt-4"
            >
              Create Your First Posting →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
