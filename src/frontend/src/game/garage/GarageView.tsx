import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useSelectedCar } from './useSelectedCar';
import { useGameState } from '../state/gameState';
import CarModel from '../scene/CarModel';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import LoginButton from '../../auth/LoginButton';

export default function GarageView() {
  const { selectedCarIndex, getSelectedCar, nextCar, previousCar } = useSelectedCar();
  const { startRace } = useGameState();
  const selectedCar = getSelectedCar();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <img src="/assets/generated/logo.dim_512x512.png" alt="Nitro Rush" className="h-12 w-12" />
          <h1 className="text-3xl font-bold text-white">NITRO RUSH</h1>
        </div>
        <LoginButton />
      </header>

      {/* 3D Car Preview */}
      <div className="h-full w-full">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 1.5, 5]} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <spotLight position={[-5, 5, 0]} intensity={0.5} angle={0.3} />
          <CarModel car={selectedCar} position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </Canvas>
      </div>

      {/* Car Selection UI */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-5xl font-bold text-white">{selectedCar.name}</h2>
            <p className="text-xl text-gray-300">
              Speed: {selectedCar.baseSpeed.toFixed(1)} km/h
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={previousCar}
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              onClick={startRace}
              size="lg"
              className="h-16 gap-3 px-12 text-xl font-bold"
            >
              <Play className="h-6 w-6" />
              START RACE
            </Button>

            <Button
              onClick={nextCar}
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === selectedCarIndex ? 'w-8 bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 z-0 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} · Built with ❤️ using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            window.location.hostname
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
