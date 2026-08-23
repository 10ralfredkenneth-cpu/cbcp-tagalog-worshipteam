import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Calendar, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Copy, 
  Archive, 
  Eye, 
  ArrowRight, 
  Clock, 
  User, 
  CheckCircle2 
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
import { getServices } from '@/lib/db-services';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from "@/lib/utils";

export const Route = createFileRoute('/_authenticated/dashboard/services')({
  component: ServiceManagementPage,
});

function ServiceManagementPage() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const handleDuplicate = (id: string) => {
    toast.info('Duplicate feature coming soon', {
      description: `Service ${id} will be clonable soon.`
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Planning & Logistics
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Service Planner</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Schedule services, design setlists, and coordinate worship team assignments.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-none border-accent/10 px-8 py-6 font-bold text-[10px] uppercase tracking-widest">
            Service Templates
          </Button>
          <Button asChild className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
            <Link to="/dashboard/services/new">
              <Plus className="w-4 h-4 mr-2" /> Plan New Service
            </Link>
          </Button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-muted/20 border border-accent/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Upcoming</p>
            <p className="font-serif text-3xl">{services.filter(s => s.status !== 'Completed' && s.status !== 'Archived').length} Services</p>
          </div>
          <Calendar className="w-8 h-8 text-accent/20" />
        </div>
        <div className="p-6 bg-muted/20 border border-accent/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Unconfirmed</p>
            <p className="font-serif text-3xl text-amber-600">
              {services.reduce((acc, s) => acc + s.assignments.filter(a => a.status === 'Pending').length, 0)} Roles
            </p>
          </div>
          <User className="w-8 h-8 text-amber-600/20" />
        </div>
        <div className="p-6 bg-muted/20 border border-accent/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Completed</p>
            <p className="font-serif text-3xl">{services.filter(s => s.status === 'Completed').length} Total</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-green-600/20" />
        </div>
      </div>

      {/* Services Table */}
      <div className="border border-accent/5 bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-accent/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Date & Service</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Leader & Team</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Setlist</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  Loading services...
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  No services scheduled.
                </TableCell>
              </TableRow>
            ) : services.map((service) => (
              <TableRow key={service.id} className="group border-accent/5 hover:bg-muted/10 transition-colors">
                <TableCell className="py-6 px-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                      {new Date(service.serviceDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <h3 className="font-serif text-lg leading-tight">{service.title}</h3>
                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> {service.serviceTime} • {service.serviceType}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-accent/10 flex items-center justify-center text-[8px] font-bold text-accent">
                        L
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Assigned
                      </span>
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase tracking-widest">
                      {service.assignments.filter(a => a.status === 'Confirmed').length}/{service.assignments.length} Confirmed
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest">{service.songs.length} Songs</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest italic line-clamp-1">
                      {service.theme || 'No theme set'}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <Badge className={cn(
                    "rounded-none border-none text-[8px] font-bold uppercase tracking-widest",
                    service.status === 'Ready' ? "bg-green-500/10 text-green-500" : 
                    service.status === 'Preparing' ? "bg-amber-500/10 text-amber-500" :
                    service.status === 'Draft' ? "bg-accent/10 text-accent" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {service.status}
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
                        <Link to="/setlists/$id" params={{ id: service.id }}>
                          <Eye className="w-3 h-3 mr-2" /> View Public Page
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Link to="/dashboard/services/new">
                          <Edit className="w-3 h-3 mr-2" /> Edit Details
                        </Link>
                      </DropdownMenuItem>


                      <DropdownMenuItem 
                        onClick={() => handleDuplicate(service.id)}
                        className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer"
                      >
                        <Copy className="w-3 h-3 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-accent/10" />
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer">
                        <Archive className="w-3 h-3 mr-2" /> Archive
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
