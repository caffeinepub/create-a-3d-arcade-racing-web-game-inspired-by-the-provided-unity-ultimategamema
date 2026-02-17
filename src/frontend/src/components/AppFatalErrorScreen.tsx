import { AlertTriangle, RefreshCw, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface AppFatalErrorScreenProps {
  error: Error | null;
  onReset: () => void;
}

export default function AppFatalErrorScreen({ error, onReset }: AppFatalErrorScreenProps) {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>
            The application encountered an unexpected error and needs to recover.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm font-mono text-muted-foreground break-words">
                {error.message || 'Unknown error'}
              </p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Try reloading the page. If the problem persists, logging out and back in may help.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={onReset} className="w-full" variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Page
          </Button>
          {identity && (
            <Button onClick={handleLogout} className="w-full" variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout and Retry
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
