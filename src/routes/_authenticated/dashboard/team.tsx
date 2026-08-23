import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Edit,
  UserCheck,
  UserX,
  Mail,
  Shield,
  ArrowRight,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/team')({
  component: TeamManagementPage,
});

function TeamManagementPage() {
  const queryClient = useQueryClient();
  const { data: team = [], isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name');
      
      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: any }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Member status updated');
    },
    onError: (error: any) => {
      toast.error('Failed to update status: ' + error.message);
    }
  });

  const archiveMemberMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'Archived' })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Member archived');
    },
    onError: (error: any) => {
      toast.error('Failed to archive member: ' + error.message);
    }
  });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status: status as any });
  };

  const handleArchive = (id: string) => {
    if (confirm('Are you sure you want to archive this team member?')) {
      archiveMemberMutation.mutate(id);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Personnel & Roles
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Worship Team Management</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Oversee team members, assign ministry roles, and manage personnel availability.
          </p>
        </div>
        <Button asChild className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Link to="/team">
            <Plus className="w-4 h-4 mr-2" /> Add Team Member
          </Link>
        </Button>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-6 border border-accent/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search members, roles, or skills..." 
            className="pl-10 rounded-none border-accent/10 focus-visible:ring-accent bg-background text-[11px] uppercase tracking-wider"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-none border-accent/10 px-6 font-bold text-[10px] uppercase tracking-widest">
            <Filter className="w-3 h-3 mr-2" /> Filters
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] rounded-none border-accent/10 bg-background text-[10px] font-bold uppercase tracking-widest">
              <SelectValue placeholder="Ministry Status" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="break">On Break</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Table */}
      <div className="border border-accent/5 bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-accent/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Member</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Primary Role</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Skills / Instruments</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Assignments</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  Loading team members...
                </TableCell>
              </TableRow>
            ) : (team || []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  No team members found.
                </TableCell>
              </TableRow>
            ) : (team || []).map((member: any) => (
              <TableRow key={member.id} className="group border-accent/5 hover:bg-muted/10 transition-colors">
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-none overflow-hidden border border-accent/10">
                      <img src={member.avatar_url || 'https://via.placeholder.com/150'} alt={member.full_name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg leading-tight">{member.full_name}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{member.email || 'No email linked'}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                   <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-accent/40" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{member.primary_role}</span>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6 max-w-[200px]">
                  <div className="flex flex-wrap gap-1">
                    {(member.skills || []).slice(0, 2).map((skill: any) => (
                      <Badge key={skill} variant="outline" className="rounded-none text-[7px] uppercase tracking-tighter border-accent/10 text-muted-foreground">
                        {skill}
                      </Badge>
                    ))}
                    {(member.skills || []).length > 2 && <span className="text-[8px] text-accent">+{(member.skills || []).length - 2}</span>}
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest">8 Upcoming</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Last: Aug 23, 2026</p>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <Badge className={cn(
                    "rounded-none border-none text-[8px] font-bold uppercase tracking-widest",
                    member.status === 'Active' ? "bg-green-500/10 text-green-500" : 
                    member.status === 'On Break' ? "bg-amber-500/10 text-amber-500" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-accent/40 hover:text-accent rounded-none">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-none border-accent/10 bg-primary text-primary-foreground">
                      <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-accent/50 font-bold">Options</DropdownMenuLabel>
                      <DropdownMenuItem asChild className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Link to="/team/$id" params={{ id: member.id }}>
                          <ArrowRight className="w-3 h-3 mr-2" /> View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Edit className="w-3 h-3 mr-2" /> Edit Member
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Mail className="w-3 h-3 mr-2" /> Contact Member
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-accent/10" />
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(member.id, 'On Break')}
                        className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer"
                      >
                        <UserX className="w-3 h-3 mr-2" /> Set On Break
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleArchive(member.id)}
                        className="text-[10px] uppercase tracking-widest font-bold text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer"
                      >
                        <Archive className="w-3 h-3 mr-2" /> Archive Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

