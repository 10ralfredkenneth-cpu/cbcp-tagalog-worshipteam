import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from 'lucide-react';
import { TeamRole, TeamMemberStatus } from '@/types/team';

export const Route = createFileRoute('/_authenticated/team/')({
  component: AddTeamMemberPage,
});

const ROLES: TeamRole[] = [
  'Worship Leader', 'Assistant Worship Leader', 'Vocalist', 
  'Acoustic Guitar', 'Electric Guitar', 'Bass', 
  'Keyboard', 'Piano', 'Drums', 'Percussion', 
  'Sound Engineer', 'Multimedia', 'Livestream', 
  'Stage Manager', 'Technical Team'
];

function AddTeamMemberPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    photoUrl: '',
    primaryRole: '' as TeamRole,
    status: 'Active' as TeamMemberStatus,
    instrument: '',
    vocalRange: '',
    bio: '',
    email: '',
    phone: '',
    dateJoined: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving member:', formData);
    navigate({ to: '/team' });
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate({ to: '/team' })}
          className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-accent uppercase hover:gap-3 transition-all mb-12"
        >
          <ArrowLeft className="h-3 w-3" />
          Cancel & Return
        </Button>

        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Administration</span>
            <h1 className="text-4xl font-serif text-primary">Add Team Member</h1>
            <p className="text-muted-foreground">Create a new ministry profile for the worship team directory.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-muted/10 p-8 border border-muted/20 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Full Name</Label>
                <Input 
                  id="fullName" 
                  required 
                  className="border-muted bg-background"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl" className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Photo URL</Label>
                <Input 
                  id="photoUrl" 
                  className="border-muted bg-background"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Primary Role</Label>
                <Select 
                  value={formData.primaryRole} 
                  onValueChange={(val) => setFormData({...formData, primaryRole: val as TeamRole})}
                >
                  <SelectTrigger className="border-muted bg-background">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(val) => setFormData({...formData, status: val as TeamMemberStatus})}
                >
                  <SelectTrigger className="border-muted bg-background">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Active', 'Available', 'Limited Availability', 'On Break', 'Inactive'].map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instrument" className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Instrument</Label>
                <Input 
                  id="instrument" 
                  className="border-muted bg-background"
                  value={formData.instrument}
                  onChange={(e) => setFormData({...formData, instrument: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vocalRange" className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Vocal Range</Label>
                <Input 
                  id="vocalRange" 
                  className="border-muted bg-background"
                  value={formData.vocalRange}
                  onChange={(e) => setFormData({...formData, vocalRange: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Short Biography</Label>
              <Textarea 
                id="bio" 
                rows={4} 
                className="border-muted bg-background font-serif text-lg"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="accent" className="h-12 px-8 text-[10px] font-bold tracking-[0.2em] uppercase">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
