import Sidebar from '@/components/ui/sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}
