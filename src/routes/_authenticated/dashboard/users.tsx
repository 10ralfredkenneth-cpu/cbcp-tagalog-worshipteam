import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  UserCheck, 
  UserPlus,
  Mail,
  ArrowRight
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from "@/lib/utils";
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/users')({
  component: UserManagementPage,
});

function UserManagementPage() {
  // Mock User Accounts (distinct from Team Members)
  const mockUsers = [
    { id: 'u1', name: 'Sarah Jenkins', email: 'sarah.j@radiantworship.com', role: 'Ministry Admin', status: 'Active', teamLinked: true },
    { id: 'u2', name: 'Mark Thompson', email: 'mark.t@radiantworship.com', role: 'Worship Leader', status: 'Active', teamLinked: true },
    { id: 'u3', name: 'David Smith', email: 'david.s@radiantworship.com', role: 'Team Member', status: 'Active', teamLinked: true },
    { id: 'u4', name: 'Admin User', email: 'admin@radiantworship.com', role: 'Super Admin', status: 'Active', teamLinked: false },
    { id: 'u5', name: 'Emily White', email: 'emily.w@radiantworship.com', role: 'Viewer', status: 'Invited', teamLinked: false },
  ];

  const handleInvite = () => {
    toast.success('Invitation sent', {
      description: 'A secure invitation link has been sent to the user.'
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            System Administration
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">User Accounts</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage system access, roles, and permissions. Link accounts to worship team profiles.
          </p>
        </div>
        <Button onClick={handleInvite} className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <UserPlus className="w-4 h-4 mr-2" /> Invite New User
        </Button>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-6 border border-accent/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 rounded-none border-accent/10 focus-visible:ring-accent bg-background text-[11px] uppercase tracking-wider"
          />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] rounded-none border-accent/10 bg-background text-[10px] font-bold uppercase tracking-widest">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="ministry_admin">Ministry Admin</SelectItem>
              <SelectItem value="worship_leader">Worship Leader</SelectItem>
              <SelectItem value="team_member">Team Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border border-accent/5 bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-accent/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">User</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">System Role</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Profile Link</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id} className="group border-accent/5 hover:bg-muted/10 transition-colors">
                <TableCell className="py-6 px-6">
                  <div>
                    <h3 className="font-serif text-lg leading-tight">{user.name}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-accent/40" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  {user.teamLinked ? (
                    <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest text-green-600 border-green-600/20">
                      Linked to Team
                    </Badge>
                  ) : (
                    <Button variant="link" className="text-[9px] font-bold uppercase tracking-widest text-accent p-0 h-auto">
                      Link to Member
                    </Button>
                  )}
                </TableCell>
                <TableCell className="py-6 px-6">
                  <Badge className={cn(
                    "rounded-none border-none text-[8px] font-bold uppercase tracking-widest",
                    user.status === 'Active' ? "bg-green-500/10 text-green-500" : "bg-accent/10 text-accent"
                  )}>
                    {user.status}
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
                      <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-accent/50 font-bold">Manage User</DropdownMenuLabel>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <UserCheck className="w-3 h-3 mr-2" /> Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Mail className="w-3 h-3 mr-2" /> Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-accent/10" />
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer">
                        <UserCheck className="w-3 h-3 mr-2" /> Suspend Account
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
