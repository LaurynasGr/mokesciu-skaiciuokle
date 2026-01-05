import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import React from 'react';

const vdu = 2312.15; // Vidutinis darbo užmokestis Lietuvoje 2026 m.
const taxRates = {
  // Gyventojų pajamų mokestis
  gpm: [
    { threshold: vdu * 60, rate: 0.32 },
    { threshold: vdu * 36, rate: 0.25 },
    { threshold: 0, rate: 0.2 },
  ],
  // Valstybinio socialinio draudimo įmokos
  vsd: [
    { threshold: vdu * 60, rate: 0 },
    { threshold: 0, rate: 0.1252 },
  ],
  // Privalomojo sveikatos draudimo įmokos
  psd: [{ threshold: 0, rate: 0.0698 }],
} as const;

interface Tax {
  amount: number;
  percentage: number;
}

interface MonthlyIncomeCalculations {
  totalAnnualBeforeTaxes: number;
  totalMonthlyAfterTaxes: number;
  taxes: {
    gpm: Tax;
    vsd: Tax;
    psd: Tax;
  };
}

interface Income {
  monthly?: number;
  additionalAnnual?: number;
}

export function TaxCalculatorPage() {
  const [income, setIncome] = React.useState<Income>({
    monthly: undefined,
    additionalAnnual: undefined,
  });

  const calculations = React.useMemo(() => {
    const results: MonthlyIncomeCalculations[] = [];
    if (income.monthly !== undefined) {
      const monthlySalary = income.monthly;
      let totalAnnual = income.additionalAnnual ?? 0;
      for (let month = 1; month <= 12; month++) {
        totalAnnual = totalAnnual + monthlySalary;
        results.push({
          totalAnnualBeforeTaxes: totalAnnual,
          totalMonthlyAfterTaxes: 0, // Will be calculated below
          taxes: {
            gpm: { amount: 0, percentage: 0 },
            vsd: { amount: 0, percentage: 0 },
            psd: { amount: 0, percentage: 0 },
          },
        });
      }
    }

    return results;
  }, [income]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-black flex items-center justify-center gap-2">
        <Calculator className="size-8" />
        Sveiki atvykę į Mokesčių Skaičiuoklę
      </h1>
      <div className="flex gap-4 mx-auto">
        <div className="p-4 border rounded-sm">
          <Label className="mb-2 block text-left font-bold">Mėnesinis atlyginimas prieš mokesčius:</Label>
          <Input
            type="number"
            value={income.monthly}
            onChange={e => setIncome(prev => ({ ...prev, monthly: Number(e.target.value) }))}
            placeholder="Įveskite mėnesinį atlyginimą"
          />
        </div>
        <div className="p-4 border rounded-sm">
          <Label className="mb-2 block text-left font-bold">Papildomos pajamos iš MB prieš mokesčius:</Label>
          <Input
            type="number"
            value={income.additionalAnnual}
            onChange={e => setIncome(prev => ({ ...prev, additionalAnnual: Number(e.target.value) }))}
            placeholder="Įveskite papildomas MB pajamas"
          />
        </div>
      </div>
      <pre className="text-left bg-gray-100 p-4 rounded">{JSON.stringify(calculations, null, 2)}</pre>
      <pre className="text-left bg-gray-100 p-4 rounded">{JSON.stringify(taxRates, null, 2)}</pre>
    </div>
  );
}
