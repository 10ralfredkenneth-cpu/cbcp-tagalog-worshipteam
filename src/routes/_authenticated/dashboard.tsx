import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Music, 
  Calendar, 
  ListMusic, 
  Users, 
  BookOpen, 
  FileVideo,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { MOCK_SETLISTS } from '@/lib/mock-setlists';
import { MOCK_SONGS } from '@/lib/mock-songs';
import { MOCK_TEAM } from '@/lib/mock-team';
import { MOCK_RESOURCES } from '@/lib/mock-resources';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: AdminDashboardOverview,
});

function AdminDashboardOverview() {
  const { isWorshipLeader, isMinistryAdmin } = useAuth();

  const stats = [
    { label: 'Upcoming Services', value: MOCK_SETLISTS.filter(s => s.status !== 'Completed' && s.status !== 'Archived').length, icon: Calendar, to: '/dashboard/services' },
    { label: 'Active Songs', value: MOCK_SONGS.filter(s => s.status === 'Active').length, icon: Music, to: '/dashboard/songs' },
    { label: 'Team Members', value: MOCK_TEAM.filter(m => m.status === 'Active').length, icon: Users, to: '/dashboard/team' },
    { label: 'Pending Assignments', value: 0, icon: Clock, to: '/dashboard/schedule' },
  ];

  const recentActivity: any[] = []; // Truthful empty state for now as no audit_logs backend is hooked up yet

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4">
        <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
          Ministry Management
        </Badge>
        <h1 className="font-serif text-5xl text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Welcome to the Radiant Worship administration portal. Manage your ministry assets, schedule, and team members from one central location.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to} className="block transition-transform hover:scale-[1.02]">
            <Card className="rounded-none border-accent/5 bg-muted/20 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-8">
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase border-b border-accent/10 pb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {isWorshipLeader && (
                <>
                  <Button asChild variant="outline" className="w-full rounded-none justify-between text-[10px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6 group">
                    <Link to="/dashboard/services">Create Service <Plus className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-none justify-between text-[10px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6 group">
                    <Link to="/dashboard/setlists">Create Setlist <Plus className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-none justify-between text-[10px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6 group">
                    <Link to="/dashboard/songs">Add Song <Plus className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" /></Link>
                  </Button>
                </>
              )}
              {isMinistryAdmin && (
                <>
                  <Button asChild variant="outline" className="w-full rounded-none justify-between text-[10px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6 group">
                    <Link to="/dashboard/team">Add Team Member <Plus className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-none justify-between text-[10px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6 group">
                    <Link to="/dashboard/resources">Add Resource <Plus className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-none justify-between text-[10px] font-bold tracking-widest uppercase border-accent/10 h-12 px-6 group">
                    <Link to="/dashboard/media">Upload Media <Plus className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" /></Link>
                  </Button>
                </>
              )}
            </div>
          </section>

          <section className="p-8 bg-primary text-primary-foreground rounded-none shadow-2xl space-y-6">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Ministry Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-white/60">System Health</span>
                <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest text-accent border-accent/20">Standby</Badge>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Active Sessions</span>
                <span className="text-xs font-serif text-accent">1</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Last Sync</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Just now</span>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase border-b border-accent/10 pb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity: any) => (
                  <div key={activity.id} className="group p-6 bg-muted/10 border border-accent/5 hover:border-accent/20 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                            {activity.action}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg">{activity.entity}</h3>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                          Modified by {activity.user}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10 rounded-none">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-12 border border-accent/5 border-dashed text-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground italic">No recent activity yet.</p>
                </div>
              )}
              {isMinistryAdmin && recentActivity.length > 0 && (
                <Button variant="link" className="text-accent text-[10px] font-bold uppercase tracking-widest p-0 h-auto" asChild>
                  <Link to="/dashboard/activity">View Full Activity Log</Link>
                </Button>
              )}
            </div>
          </section>

          {/* Upcoming Services Preview */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase border-b border-accent/10 pb-4">
              Upcoming Planning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_SETLISTS.slice(0, 2).map((setlist) => (
                <Card key={setlist.id} className="rounded-none border-accent/5 bg-muted/10">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest border-accent/20 text-accent">
                        {setlist.status}
                      </Badge>
                      <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                        {new Date(setlist.serviceDate).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-xl">{setlist.title}</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">
                      WL: {MOCK_TEAM.find(t => t.id === setlist.worshipLeader)?.fullName || 'Unassigned'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex -space-x-2">
                        {setlist.assignments.slice(0, 3).map((a) => (
                          <div key={a.id} className="w-6 h-6 rounded-none bg-accent/20 border border-primary flex items-center justify-center text-[8px] font-bold text-accent">
                            {a.role.substring(0, 1)}
                          </div>
                        ))}
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-accent text-[9px] font-bold uppercase tracking-widest p-0 h-auto">
                        <Link to={`/dashboard/setlists`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
