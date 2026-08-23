import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { MOCK_TEAM } from '@/lib/mock-team';
import { MOCK_SETLISTS } from '@/lib/mock-setlists';
import { MOCK_RESOURCES } from '@/lib/mock-resources';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Clock3, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  Info,
  User,
  Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AssignmentStatus } from '@/types/setlists';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  // In a real app, this would use the current logged-in user's ID
  const currentMemberId = "1"; // Sarah Jenkins
  const member = MOCK_TEAM.find(m => m.id === currentMemberId);

  const myAssignments = useMemo(() => {
    const assignments: any[] = [];
    MOCK_SETLISTS.forEach((service: any) => {
      const myAssignment = service.assignments?.find((a: any) => a.memberId === currentMemberId);
      if (myAssignment) {
        assignments.push({
          ...myAssignment,
          serviceTitle: service.title,
          serviceDate: service.serviceDate,
          serviceTime: service.serviceTime,
          serviceId: service.id,
          rehearsalDate: service.rehearsalDate,
          rehearsalTime: service.rehearsalTime
        });
      }
    });
    return assignments.sort((a, b) => new Date(a.serviceDate).getTime() - new Date(b.serviceDate).getTime());
  }, [currentMemberId]);

  const getStatusIcon = (status: AssignmentStatus) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Clock3 className="w-4 h-4 text-amber-600" />;
      case 'Declined': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Needs Replacement': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Team Dashboard
          </Badge>
          <h1 className="font-serif text-5xl lg:text-6xl text-foreground">
            Welcome, {member?.fullName.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
            {member?.primaryRole} • {member?.status}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase border-b border-accent/10 pb-4">
                My Upcoming Schedule
              </h2>
              
              <div className="space-y-4">
                {myAssignments.length > 0 ? (
                  myAssignments.map((assignment) => (
                    <div key={assignment.id} className="group p-6 bg-muted/20 border border-accent/5 hover:border-accent/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[9px] font-bold text-accent uppercase tracking-widest mb-1">
                            {new Date(assignment.serviceDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                          <h3 className="font-serif text-2xl group-hover:text-accent transition-colors">
                            {assignment.serviceTitle}
                          </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-6 text-[10px] text-muted-foreground uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-accent/30" />
                            Service: {assignment.serviceTime}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-accent/30" />
                            Role: {assignment.role}
                          </div>
                          {assignment.callTime && (
                            <div className="flex items-center gap-2 text-accent">
                              <Info className="w-3 h-3" />
                              Call Time: {assignment.callTime}
                            </div>
                          )}
                        </div>

                        {assignment.rehearsalDate && (
                          <div className="pt-2 border-t border-accent/5">
                            <p className="text-[9px] text-muted-foreground/60 uppercase tracking-widest">
                              Rehearsal: {new Date(assignment.rehearsalDate).toLocaleDateString()} @ {assignment.rehearsalTime}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-4 border-t md:border-t-0 pt-4 md:pt-0">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-accent/10">
                          {getStatusIcon(assignment.status)}
                          <span className="text-[9px] font-bold uppercase tracking-widest">
                            {assignment.status}
                          </span>
                        </div>
                        
                        <Button asChild variant="outline" className="rounded-none h-10 px-6 text-[10px] font-bold tracking-widest uppercase border-accent/20 hover:bg-accent hover:text-primary transition-all">
                          <Link to="/setlists/$id" params={{ id: assignment.serviceId }}>
                            View Plan <ChevronRight className="ml-2 w-3 h-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-muted/20 border border-dashed border-accent/10">
                    <p className="text-muted-foreground font-serif italic">No upcoming assignments scheduled.</p>
                  </div>
                )}
              </div>
            </section>
            <section className="space-y-8">
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase border-b border-accent/10 pb-4">
                Saved Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_RESOURCES.slice(0, 2).map((resource) => (
                  <Link 
                    key={resource.id} 
                    to="/resources/$id" 
                    params={{ id: resource.id }}
                    className="group flex flex-col p-6 bg-muted/10 border border-accent/5 hover:border-accent/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest border-accent/20 text-accent/60">
                        {resource.category}
                      </Badge>
                      <Bookmark className="w-3 h-3 text-accent/40 group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-serif text-lg mb-2 group-hover:text-accent transition-colors line-clamp-1">
                      {resource.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-auto pt-4 border-t border-accent/5">
                      {resource.author} • {resource.readingTime} min
                    </p>
                  </Link>
                ))}
                <Link 
                  to="/resources" 
                  className="flex items-center justify-center p-6 border border-dashed border-accent/10 hover:border-accent/30 transition-all text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-accent"
                >
                  View Library <ChevronRight className="ml-2 w-3 h-3" />
                </Link>
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase border-b border-accent/10 pb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="w-full rounded-none justify-start text-[9px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6">
                  Update My Availability
                </Button>
                <Button variant="outline" className="w-full rounded-none justify-start text-[9px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6">
                  Request Time Off
                </Button>
                <Button variant="outline" className="w-full rounded-none justify-start text-[9px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6">
                  Team Directory
                </Button>
              </div>
            </section>

            <section className="p-8 bg-primary text-primary-foreground rounded-none shadow-2xl space-y-6">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">My Availability</h3>
              <div className="space-y-4">
                {member?.availability?.slice(0, 3).map(av => (
                  <div key={av.id} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div>
                      <p className="text-[9px] font-bold text-accent uppercase">{new Date(av.date).toLocaleDateString()}</p>
                      <p className="text-xs text-white/60">{av.notes || 'No notes'}</p>
                    </div>
                    <Badge variant="outline" className={cn(
                      "rounded-none text-[8px] uppercase tracking-widest",
                      av.status === 'Available' ? "text-green-400 border-green-400/20" : "text-red-400 border-red-400/20"
                    )}>
                      {av.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="link" className="text-accent text-[9px] font-bold uppercase tracking-widest p-0 h-auto">
                  View Full Calendar
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

