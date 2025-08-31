import Link from "next/link";

export default function InternshipsPage() {
  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Internships</h1>
        <p className="text-muted-foreground">Manage your internship postings and find talented students</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
          <h2 className="text-xl font-semibold text-foreground mb-3">Create New Posting</h2>
          <p className="text-muted-foreground mb-4">
            Post a new internship opportunity to attract talented students. 
            Describe your role, requirements, and what students will learn.
          </p>
          <Link 
            href="/internships/new" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Create New Posting →
          </Link>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
          <h2 className="text-xl font-semibold text-foreground mb-3">Active Postings</h2>
          <p className="text-muted-foreground mb-4">
            View and manage your current internship postings. 
            See applications, update details, and track student interest.
          </p>
          <Link 
            href="/internships/active" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            View Active Postings →
          </Link>
        </div>
      </div>
    </div>
  );
}
