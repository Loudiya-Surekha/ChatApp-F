import { Users } from 'lucide-react';

function SidebarSkeleton() {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-100 border-end d-flex flex-column" style={{ width: '80px', maxWidth: '288px', transition: 'all 0.2s' }}>
      <div className="border-bottom w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users size={24} />
          <span className="fw-medium d-none d-lg-block">Contacts</span>
        </div>
      </div>
      <div className="overflow-auto w-100 py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-100 p-2 d-flex align-items-center gap-2">
            <div className="mx-auto mx-lg-0 position-relative">
              <div className="bg-secondary rounded-circle" style={{ width: '48px', height: '48px' }} />
            </div>
            <div className="d-none d-lg-flex flex-column flex-grow-1 text-start">
              <div className="bg-secondary mb-2" style={{ height: '16px', width: '128px', borderRadius: '4px' }} />
              <div className="bg-secondary" style={{ height: '12px', width: '64px', borderRadius: '4px' }} />
            </div>

          </div>
        ))}
      </div>
    </aside>
  );
}

export default SidebarSkeleton;
