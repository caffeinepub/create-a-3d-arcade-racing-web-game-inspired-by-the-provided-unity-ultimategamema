import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useGameState } from './game/state/gameState';
import GarageView from './game/garage/GarageView';
import RaceView from './game/RaceView';
import ProfileSetupModal from './auth/ProfileSetupModal';
import AppErrorBoundary from './components/AppErrorBoundary';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Button } from './components/ui/button';

function AppContent() {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched, isError, error } = useGetCallerUserProfile();
  const { currentView } = useGameState();

  const isAuthenticated = !!identity;
  
  // Show profile setup only when:
  // - User is authenticated
  // - Profile fetch is complete (not loading)
  // - Profile fetch succeeded (isFetched)
  // - Profile is null (no profile exists)
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold text-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error banner if profile fetch failed (but don't block the app)
  const showProfileError = isAuthenticated && isError && !profileLoading;

  return (
    <>
      {showProfileError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Profile Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p className="text-sm">
                {error?.message || 'Failed to load your profile. You may need to log out and back in.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await clear();
                  window.location.reload();
                }}
                className="w-fit"
              >
                Logout and Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {showProfileSetup && <ProfileSetupModal />}
      {currentView === 'garage' ? <GarageView /> : <RaceView />}
      <Toaster />
    </>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AppContent,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
