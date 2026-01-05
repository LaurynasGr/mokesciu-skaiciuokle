import { Calculator } from 'lucide-react';
import './index.css';

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <h1 className="text-2xl font-black flex items-center justify-center gap-2">
        <Calculator className="size-8" />
        Sveiki atvykę į Mokesčių Skaičiuoklę
      </h1>
    </div>
  );
}

export default App;
