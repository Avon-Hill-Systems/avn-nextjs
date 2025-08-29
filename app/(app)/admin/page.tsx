import AdminUserTable from "@/components/(app)/admin/UserTable";

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, profiles, and resumes.</p>
      </div>
      <AdminUserTable />
    </div>
  );
}
