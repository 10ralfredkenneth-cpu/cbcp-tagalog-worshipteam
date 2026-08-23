import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/db-services';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Music, Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard/services/$id')({
  component: ServiceDetailsPage,
});

function ServiceDetailsPage() {
  const { id } = Route.useParams();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  const service = services.find(s => s.id === id);

  if (isLoading) return <div className="p-12 text-center uppercase tracking-widest text-[10px]">Loading service details...</div>;
  if (!service) return <div className="p-12 text-center uppercase tracking-widest text-[10px]">Service not found</div>;

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent">
            <Link to="/dashboard/services" className="hover:text-accent/80 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Details</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-accent rounded-none" asChild>
              <Link to="/dashboard/services">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="font-serif text-5xl text-foreground">{service.title}</h1>
          </div>
          <div className="flex items-center gap-4 ml-14">
            <Badge className="rounded-none bg-accent/10 text-accent border-none uppercase text-[9px] tracking-widest">
              {service.status}
            </Badge>
            <span className="text-muted-foreground text-xs uppercase tracking-widest">
              {new Date(service.serviceDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-none border-accent/20 text-[10px] uppercase font-bold tracking-widest px-8 py-6">
            <Edit className="w-4 h-4 mr-2" /> Edit Details
          </Button>
          <Button asChild className="rounded-none bg-accent text-primary hover:bg-accent/90 px-8 py-6 font-bold text-[10px] uppercase tracking-widest shadow-xl">
            <Link to="/dashboard/setlists" search={{ serviceId: service.id }}>
              Manage Setlist
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 ml-14">
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border-b border-accent/10 pb-2">Service Flow</h3>
            <div className="space-y-4">
              {service.songs.length > 0 ? (
                service.songs.map((item: any, idx: number) => (
                  <div key={item.id} className="group p-6 bg-muted/10 border border-accent/5 hover:border-accent/20 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="font-serif text-2xl text-accent/20 w-8">{idx + 1}</span>
                      <div>
                        <h4 className="font-serif text-xl">Song Item</h4>
                        <div className="flex items-center gap-3 mt-1">
                           <Badge variant="outline" className="rounded-none text-[8px] border-accent/20 text-accent uppercase">{item.selectedKey}</Badge>
                           <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 border border-accent/5 border-dashed text-center">
                  <Music className="w-8 h-8 text-accent/10 mx-auto mb-4" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground italic">No songs added to this service setlist yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section className="p-8 bg-muted/20 border border-accent/5 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Gathering Info</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Service Time</p>
                  <p className="text-sm">{service.serviceTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                  <p className="text-sm">{service.rehearsalLocation || 'Main Sanctuary'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <User className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Worship Leader</p>
                  <p className="text-sm">Assigned</p>
                </div>
              </div>
            </div>
          </section>

          {service.theme && (
            <section className="p-8 border border-accent/5 space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Ministry Vision</h3>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider">{service.theme}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                  {service.notes || 'No planning notes provided.'}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
