export default function ActiveInternshipsPage() {
  return (
    <div className="p-6 bg-background">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-normal text-foreground mb-4">Active Internships</h1>
        <p className="text-lg text-muted-foreground">
          You haven&apos;t created any internship postings yet.{" "}
          <a href="/profile" className="text-primary hover:underline">Complete your startup profile</a>{" "}
          first, then{" "}
          <a href="/internships/new" className="text-primary hover:underline">create your first internship opportunity</a>.
        </p>
      </div>
    </div>
  );
}
