import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { MOCK_RESOURCES } from '@/lib/mock-resources';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { ResourceSearch } from '@/components/resources/ResourceSearch';
import { ResourceFilters } from '@/components/resources/ResourceFilters';
import { ResourceCategory, ResourceType } from '@/types/resources';
import { TeamRole } from '@/types/team';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/_public/resources')({
  component: ResourcesLibrary,
});

function ResourcesLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<ResourceCategory | 'All'>('All');
  const [resourceType, setResourceType] = useState<ResourceType | 'All'>('All');
  const [role, setRole] = useState<TeamRole | 'All Team Members' | 'All'>('All');

  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        resource.scriptureReferences?.some(ref => {
          const val = typeof ref === 'string' ? ref : ref.reference;
          return val.toLowerCase().includes(searchQuery.toLowerCase());
        });
      
      const matchesCategory = category === 'All' || resource.category === category;
      const matchesType = resourceType === 'All' || resource.resourceType === resourceType;
      const matchesRole = role === 'All' || resource.ministryRoles.includes(role as any) || resource.ministryRoles.includes('All Team Members');

      return matchesSearch && matchesCategory && matchesType && matchesRole;
    });
  }, [searchQuery, category, resourceType, role]);

  const featuredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(r => r.featured).slice(0, 2);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <section className="bg-primary/5 py-24 px-6 border-b border-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Equipping the Saints</span>
            <h1 className="font-serif text-5xl mt-6 mb-8 text-foreground leading-tight">Worship Resources</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Biblical teaching, devotionals, training, and practical tools to help worshippers grow in faith, character, skill, and service.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-12">
            <div>
              <h3 className="font-serif text-2xl mb-8">Refine</h3>
              <ResourceFilters 
                selectedCategory={category}
                onCategoryChange={setCategory}
                selectedType={resourceType}
                onTypeChange={setResourceType}
                selectedRole={role}
                onRoleChange={setRole}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-16">
            {/* Search and Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <ResourceSearch value={searchQuery} onChange={setSearchQuery} />
              <div className="text-sm text-muted-foreground italic">
                Showing {filteredResources.length} resources
              </div>
            </div>

            {/* Featured Section (only if no active filtering) */}
            {searchQuery === '' && category === 'All' && resourceType === 'All' && role === 'All' && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif text-3xl">Featured</h2>
                  <Separator className="flex-1 bg-accent/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            )}

            {/* Library Grid */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-3xl">Library</h2>
                <Separator className="flex-1 bg-accent/10" />
              </div>
              
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-accent/20">
                  <p className="text-muted-foreground italic">No resources found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setCategory('All');
                      setResourceType('All');
                      setRole('All');
                    }}
                    className="mt-4 text-accent text-sm font-bold uppercase tracking-widest hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
