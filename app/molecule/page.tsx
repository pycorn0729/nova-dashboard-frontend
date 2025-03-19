import ErrorView from "../components/ErrorView";
import { fetchMolecule } from "../services/molecule";
import SmilesToImage from "../components/SmilesToImage";
import Link from "next/link";

export default async function Molec({searchParams}:{searchParams: Promise<{molecule?: string}>}) {
    const molecule = (await searchParams).molecule ?? '';
    const {data: smiles, error} = await fetchMolecule(molecule);
    if (error) {
      return <ErrorView error={error} />;
    }
    
    return (
    <div className="max-w-[80%] mx-auto p-6 bg-white">
      <div className="mb-8">

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Molecule Details</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Molecule</h2>
                <p className="text-gray-600 break-all">{molecule}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">SMILES</h2>
                <p className="text-gray-600 font-mono break-all">{smiles}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Molecular Structure</h2>
              <div className="flex justify-center">
                <SmilesToImage smiles={smiles} width={400} height={400} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }