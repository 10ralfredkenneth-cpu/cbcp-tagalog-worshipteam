import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  FileVideo, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Edit,
  Archive,
  Eye,
  Settings,
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
import { useQuery } from '@tanstack/react-query';
import { getMedia } from '@/lib/db-resources.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/media')({
  component: MediaManagementPage,
});

function MediaManagementPage() {
  const { data: media = [], isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: getMedia,
  });

  const handleArchive = (id: string) => {
    toast.success('Media archived', {
      description: `Media item ${id} moved to archive.`
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="rounded-none uppercase text-[10px] tracking-widest border-accent/20 text-accent">
            Media & Storage
          </Badge>
          <h1 className="font-serif text-5xl text-foreground">Media Management</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage media assets, update metadata, and organize ministry collections.
          </p>
        </div>
        <Button asChild className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
          <Link to="/media">
            <Plus className="w-4 h-4 mr-2" /> Upload New Media
          </Link>
        </Button>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-6 border border-accent/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search media by title or tags..." 
            className="pl-10 rounded-none border-accent/10 focus-visible:ring-accent bg-background text-[11px] uppercase tracking-wider"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-none border-accent/10 px-6 font-bold text-[10px] uppercase tracking-widest">
            <Filter className="w-3 h-3 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Media Table */}
      <div className="border border-accent/5 bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-accent/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Media Asset</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-center">Type</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Visibility</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6">Uploaded</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-accent/50 py-6 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  Loading media...
                </TableCell>
              </TableRow>
            ) : media.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground uppercase text-[10px] tracking-widest italic">
                  No media found.
                </TableCell>
              </TableRow>
            ) : media.map((item: any) => (
              <TableRow key={item.id} className="group border-accent/5 hover:bg-muted/10 transition-colors">
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/5 flex items-center justify-center border border-accent/10 overflow-hidden">
                      {item.thumbnailUrl ? (
                        <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <FileVideo className="w-4 h-4 text-accent/40" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg leading-tight">{item.title}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6 text-center">
                   <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest border-accent/10">
                     {item.mediaType}
                   </Badge>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                    <Settings className="w-3 h-3" /> {item.visibility}
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6 text-[9px] uppercase tracking-widest text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
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
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Eye className="w-3 h-3 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest font-bold focus:bg-accent focus:text-primary cursor-pointer">
                        <Edit className="w-3 h-3 mr-2" /> Edit Metadata
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-accent/10" />
                      <DropdownMenuItem 
                        onClick={() => handleArchive(item.id)}
                        className="text-[10px] uppercase tracking-widest font-bold text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer"
                      >
                        <Archive className="w-3 h-3 mr-2" /> Archive Media
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
