import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { MOCK_TEAM } from '@/lib/mock-team';
import { MOCK_SETLISTS } from '@/lib/mock-setlists';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Music, 
  Mic2, 
  Mail, 
  ArrowLeft,
  Clock,
  Shield,
  Star,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { TeamMemberStatus } from '@/types/team';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { AssignmentStatus } from '@/types/setlists';

export const Route = createFileRoute('/_public/team/$id')({
  component: MemberProfilePage,
  loader: ({ params }) => {
    const member = MOCK_TEAM.find(m => m.id === params.id);
    if (!member) throw notFound();
    return { member };
  }
});

function MemberProfilePage() {
  const { member } = Route.useLoaderData();

  const servingHistory = useMemo(() => {
    const history: any[] = [];
    MOCK_SETLISTS.forEach(service => {
      const assignment = service.assignments?.find(a => a.memberId === member.id);
      if (assignment) {
        history.push({
          ...assignment,
          serviceTitle: service.title,
          serviceDate: service.serviceDate
        });
      }
    });
    return history.sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime()).slice(0, 5);
  }, [member.id]);

  const getStatusColor = (status: TeamMemberStatus) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'Available': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'Limited Availability': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'On Break': return 'bg-orange-500/10 text-orange-600 border-orange-200';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-sm pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Link 
          to="/team" 
          className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-accent uppercase hover:gap-3 transition-all mb-12"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Team Directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar / Photo */}
          <div className="lg:col-span-4 space-y-8">
            <div className="aspect-[3/4] overflow-hidden bg-muted rounded-sm">
              <img 
                src={member.photoUrl} 
                alt={member.fullName} 
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="p-6 bg-muted/20 border border-muted/20 rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Current Status</span>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>Joined {new Date(member.dateJoined).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
                {member.instrument && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Music className="h-4 w-4 text-accent" />
                    <span>Primary: {member.instrument}</span>
                  </div>
                )}
                {member.vocalRange && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mic2 className="h-4 w-4 text-accent" />
                    <span>Range: {member.vocalRange}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-muted/20 space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Ministry Groups</h4>
                <div className="flex flex-wrap gap-2">
                  {member.groups.map((group: string) => (
                    <Badge key={group} variant="outline" className="text-[10px] tracking-wide border-muted">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">{member.primaryRole}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-primary leading-tight">{member.fullName}</h1>
              {member.secondaryRoles.length > 0 && (
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground italic">
                  Also serving as: {member.secondaryRoles.join(', ')}
                </div>
              )}
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-4">About {member.fullName.split(' ')[0]}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-serif">
                {member.bio || "No biography provided."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-muted/20">
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Skills & Capabilities</h3>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill: string) => (
                    <div key={skill} className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-full border border-muted/20">
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Internal Information</h3>
                  <Shield className="h-4 w-4 text-accent/50" />
                </div>
                <div className="bg-muted/10 p-6 rounded-sm space-y-4 border border-accent/10">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-accent/60" />
                    <span className="text-muted-foreground">Contact details are visible to team leaders only.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-accent/60" />
                    <span className="text-muted-foreground italic">Preferred Service: Sunday Morning</span>
                  </div>
                  {member.internalNotes && (
                    <div className="pt-4 mt-4 border-t border-accent/10">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-bold text-primary mr-2 uppercase tracking-tighter">Leader Notes:</span>
                        {member.internalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-muted/20">
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Serving History</h3>
                <div className="space-y-4">
                  {servingHistory.length > 0 ? (
                    servingHistory.map((assignment: any) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 bg-muted/20 border border-accent/5">
                        <div>
                          <p className="text-[10px] font-bold text-accent uppercase">{new Date(assignment.serviceDate).toLocaleDateString()}</p>
                          <p className="text-sm font-serif">{assignment.serviceTitle}</p>
                        </div>
                        <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest text-muted-foreground border-muted">
                          {assignment.role}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No recent serving history.</p>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Availability</h3>
                <div className="space-y-4">
                  {member.availability?.map((av: any) => (
                    <div key={av.id} className="flex items-center justify-between p-4 bg-muted/20 border border-accent/5">
                      <div>
                        <p className="text-[10px] font-bold text-accent uppercase">{new Date(av.date).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{av.notes || 'No specific notes'}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "rounded-none text-[8px] uppercase tracking-widest",
                        av.status === 'Available' ? "text-green-600 border-green-500/20" : "text-red-600 border-red-500/20"
                      )}>
                        {av.status}
                      </Badge>
                    </div>
                  ))}
                  {(!member.availability || member.availability.length === 0) && (
                    <p className="text-sm text-muted-foreground italic">No availability data set.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-12">
              <Button variant="accent" className="h-12 px-8 text-[10px] font-bold tracking-[0.2em] uppercase">
                Schedule for Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
