// pages/hry/memory.js

import MemoryGame from '../../components/MemoryGame';

export default function MemoryPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🧠 Ironické memory s panem Novákem</h1>
      <p className="mb-4">Najdi správné dvojice: oficiální fráze a jejich ironické verze.</p>
      <MemoryGame />
    </div>
  );
}
