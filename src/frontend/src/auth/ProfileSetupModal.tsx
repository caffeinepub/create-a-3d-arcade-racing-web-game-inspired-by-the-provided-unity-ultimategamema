import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        await saveProfile.mutateAsync({
          highScore: BigInt(0),
          // Omit lastSelectedCarIndex entirely (undefined encodes as opt-none in Candid)
          lastSelectedCarIndex: undefined,
        });
        toast.success('Profile created! Welcome to Nitro Rush!');
      } catch (error: any) {
        console.error('Failed to save profile:', error);
        toast.error(error.message || 'Failed to create profile. Please try again.');
      }
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Welcome to Nitro Rush!</DialogTitle>
          <DialogDescription>
            Set up your profile to start racing and track your high scores.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your racing name"
              autoFocus
            />
          </div>
          {saveProfile.isError && (
            <p className="text-sm text-destructive">
              Failed to create profile. Please try again.
            </p>
          )}
          <Button type="submit" className="w-full" disabled={!name.trim() || saveProfile.isPending}>
            {saveProfile.isPending ? 'Setting up...' : 'Start Racing'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
