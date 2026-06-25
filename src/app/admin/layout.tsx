import { AdminNav, AdminBrand } from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas lg:flex-row">
      {/* sidebar */}
      <aside className="sticky top-0 z-30 flex h-auto shrink-0 flex-col gap-6 bg-ink p-4 lg:h-screen lg:w-64">
        <div className="flex items-center justify-between lg:block">
          <AdminBrand />
        </div>
        <div className="hidden lg:block">
          <AdminNav />
        </div>
        {/* mobile horizontal nav */}
        <div className="lg:hidden">
          <AdminNav />
        </div>
      </aside>

      <main id="main" className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
