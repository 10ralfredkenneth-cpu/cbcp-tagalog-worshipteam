import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Music, 
  Calendar, 
  ListMusic, 
  Users, 
  Clock, 
  BookOpen, 
  FileVideo, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
}

function SidebarItem({ to, icon, label, collapsed, active }: SidebarItemProps) {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-4 px-4 py-3 group transition-all duration-300",
        "border-l-2 border-transparent hover:bg-accent/5",
        active ? "bg-accent/10 border-accent text-accent" : "text-muted-foreground hover:text-foreground hover:border-accent/30"
      )}
    >
      <div className={cn("flex-shrink-0 transition-transform duration-300", !collapsed && "group-hover:scale-110")}>
        {icon}
      </div>
      {!collapsed && (
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2">
          {label}
        </span>
      )}
    </Link>
  );
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut, isMinistryAdmin, isWorshipLeader } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const navigation = [
    { section: "Main", items: [
      { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Overview" },
    ]},
    { section: "Planning", items: [
      { to: "/setlists", icon: <Calendar size={18} />, label: "Services" },
      { to: "/setlists", icon: <ListMusic size={18} />, label: "Setlists" },
      { to: "/songs", icon: <Music size={18} />, label: "Song Library" },
    ]},
    { section: "Team", items: [
      { to: "/team", icon: <Users size={18} />, label: "Members" },
      { to: "/dashboard", icon: <Clock size={18} />, label: "Schedule" },
    ]},
    { section: "Content", items: [
      { to: "/resources", icon: <BookOpen size={18} />, label: "Resources" },
      { to: "/media", icon: <FileVideo size={18} />, label: "Media" },
    ]},
    { section: "System", items: [
      { to: "/dashboard", icon: <User size={18} />, label: "My Profile" },
      ...(isMinistryAdmin ? [{ to: "/dashboard", icon: <Settings size={18} />, label: "Settings" }] : []),
    ]},
  ];

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-20 left-6 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobile}
          className="rounded-none bg-background border-accent/20 text-accent h-10 w-10 shadow-xl"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-primary border-r border-accent/10 transition-all duration-500 ease-in-out",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full py-8">
          {/* Header */}
          <div className={cn("px-6 mb-12 flex items-center", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && (
              <div className="animate-in fade-in duration-500">
                <span className="font-serif text-xl text-accent tracking-tighter">Radiant</span>
                <span className="block text-[8px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Management</span>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="hidden lg:flex text-accent/40 hover:text-accent transition-colors"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none space-y-8">
            {navigation.map((group) => (
              <div key={group.section} className="space-y-1">
                {!collapsed && (
                  <h3 className="px-6 text-[8px] font-bold text-accent/30 uppercase tracking-[0.4em] mb-4 px-6">
                    {group.section}
                  </h3>
                )}
                {group.items.map((item) => (
                  <SidebarItem 
                    key={item.label} 
                    {...item} 
                    collapsed={collapsed} 
                  />
                ))}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto px-2 space-y-2">
            <button 
              onClick={signOut}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <LogOut size={18} />
              {!collapsed && (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleMobile}
        />
      )}
    </>
  );
}
