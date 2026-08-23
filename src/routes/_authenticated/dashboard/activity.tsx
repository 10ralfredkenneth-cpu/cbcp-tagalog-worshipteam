import { createFileRoute } from '@tanstack/react-router';
import { 
  History,
  Search,
  Filter,
  User,
  Activity,
  ArrowRight,
  Shield,
  FileText
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export const Route = createFileRoute('/_authenticated/dashboard/activity')({
  component: ActivityLogPage,
});

function ActivityLogPage() {
  // Mock audit logs
  const logs = [
    { id: '1', user: 'Sarah Jenkins', action: 'Update Role', entity: 'Team Member: David Smith', type: 'Team', timestamp: '2026-08-23 09:30 AM', status: 'Success' },
    { id: '2', user: 'Admin', action: 'Publish Resource', entity: 'Devotional: Psalm 23', type: 'Content', timestamp: '2026-08-23 08:45 AM', status: 'Success' },
    { id: '3', user: 'Sarah Jenkins', action: 'Delete Media', entity: 'Photo: Rehearsal_0822.jpg', type: 'Media', timestamp: '2026-08-22 04:15 PM', status: 'Success' },
    { id: '4', user: 'Mark Thompson', action: 'Create Setlist', entity: 'Sunday Service - Aug 30', type: 'Planning', timestamp: '2026-08-22 11:20 AM', status: 'Success' },
    { id: '5', user: 'Admin', action: 'Update Setting', entity: 'Ministry Name', type: 'System', timestamp: '2026-08-21 02:05 PM', status: 'Success' },
    { id: '6', user: 'Sarah Jenkins', action: 'Archive Song', entity: 'Old Hymn #45', type: 'Songs', timestamp: '2026-08-21 10:10 AM', status: 'Success' },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'Team': return <User className="w-3 h-3" />;
      case 'Content': return <FileText className="w-3 h-3" />;
      case 'System': return <Shield className="w-3 h-3" />;
      case 'Planning': return <Activity className="w-3 h-3" />;
      default: return <History className="w-3 h-3" />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4">
        <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
          System Administration
        </Badge>
        <h1 className="font-serif text-5xl text-foreground">Activity Log</h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Track all administrative actions across the ministry platform. Logs are read-only and maintained for security auditing purposes.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-6 border border-accent/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search activity..." 
            className="pl-10 rounded-none border-accent/10 focus-visible:ring-accent bg-background"
          />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] rounded-none border-accent/10 bg-background">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-none border-accent/10 px-6 font-bold text-[10px] uppercase tracking-widest">
            <Filter className="w-3 h-3 mr-2" /> Filter
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="border border-accent/5 bg-background">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-accent/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Timestamp</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">User</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Action</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Entity</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="group border-accent/5 hover:bg-muted/10 transition-colors">
                <TableCell className="text-[11px] text-muted-foreground py-6 px-6">{log.timestamp}</TableCell>
                <TableCell className="font-bold text-[11px] py-6 px-6">{log.user}</TableCell>
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent/10 flex items-center justify-center text-accent">
                      {getActionIcon(log.type)}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest">{log.action}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[11px] py-6 px-6 italic text-muted-foreground">{log.entity}</TableCell>
                <TableCell className="py-6 px-6">
                  <Badge className="bg-green-500/10 text-green-500 rounded-none border-none text-[8px] font-bold uppercase tracking-widest">
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 px-6 text-right">
                  <Button variant="ghost" size="icon" className="text-accent/40 group-hover:text-accent transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between text-muted-foreground">
        <p className="text-[10px] uppercase tracking-widest">Showing 6 of 248 activities</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-none border-accent/10 text-[9px] uppercase font-bold tracking-widest disabled:opacity-30" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="rounded-none border-accent/10 text-[9px] uppercase font-bold tracking-widest">Next</Button>
        </div>
      </div>
    </div>
  );
}
