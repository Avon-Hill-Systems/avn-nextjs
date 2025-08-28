export default function MatchesPage() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Matches</h1>
        <p className="text-muted-foreground">View your startup matches and opportunities</p>
      </div>
      
      <div className="h-full min-h-[calc(100vh-13rem)] flex items-center justify-center -mt-32">
        <div className="text-center">
          <p className="text-muted-foreground">Complete your first round interview to see your matches</p>
        </div>
      </div>
    </div>
  );
}
