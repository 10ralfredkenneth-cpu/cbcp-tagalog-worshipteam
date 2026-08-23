import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { MOCK_TEAM } from '@/lib/mock-team';
import { TeamMemberStatus } from '@/types/team';
import { LayoutGrid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute('/_public/team/')({


  component: TeamPage,
});

function TeamPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMembers = useMemo(() => {
    return MOCK_TEAM.filter(member => {
      const matchesSearch = member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.primaryRole.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || member.primaryRole === roleFilter;
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  const roles = Array.from(new Set(MOCK_TEAM.map(m => m.primaryRole))).sort();
  const statuses = ['Active', 'Available', 'Limited Availability', 'On Break', 'Inactive'];

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 border-b border-muted/20">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Ministry Members</span>
            <h1 className="text-5xl md:text-6xl font-serif text-primary leading-tight">Worship Team</h1>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed italic">
              Serving together with humility, faithfulness, and excellence for the glory of God.
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-muted/20 py-4 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or role..." 
                className="pl-10 h-10 border-muted focus-visible:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px] h-10 border-muted">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-10 border-muted">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 border-l border-muted/20 pl-4 h-10">
            <Button 
              variant={viewMode === 'grid' ? 'accent' : 'ghost'} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'accent' : 'ghost'} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Directory */}
      <main className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground font-serif text-xl">No team members found matching your criteria.</p>
              <Button 
                variant="link" 
                className="text-accent mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map(member => (
                <Link 
                  key={member.id} 
                  to="/team/$id" 
                  params={{ id: member.id }}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
                    <img 
                      src={member.photoUrl} 
                      alt={member.fullName} 
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getStatusColor(member.status)} border backdrop-blur-sm shadow-sm`}>
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif text-primary group-hover:text-accent transition-colors">
                      {member.fullName}
                    </h3>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                      {member.primaryRole}
                    </p>
                    {member.instrument && (
                      <p className="text-xs text-muted-foreground italic">
                        {member.instrument}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-muted/20 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-muted/30 border-b border-muted/20">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Member</th>
                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Primary Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Instrument/Voice</th>
                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-primary uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted/10">
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden bg-muted rounded-full">
                            <img src={member.photoUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                          </div>
                          <span className="font-serif text-primary font-medium">{member.fullName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{member.primaryRole}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{member.instrument || member.vocalRange || '-'}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={`${getStatusColor(member.status)} border-none`}>
                          {member.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to="/team/$id" 
                          params={{ id: member.id }}
                          className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase hover:underline"
                        >
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
