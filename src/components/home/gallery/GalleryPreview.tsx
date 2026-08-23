import { Link } from "@tanstack/react-router";

export function GalleryPreview() {
  const images = [
    "https://images.unsplash.com/photo-1525268771113-32da9e9250a3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253127-7798075e1140?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-serif text-foreground">Worship Moments</h2>
            <Link to="/media" className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase border-b border-accent/30 pb-1">View Media</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {images.map((img, i) => (
             <div key={i} className={`aspect-[4/5] overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
               <img src={img} alt="Worship moment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
