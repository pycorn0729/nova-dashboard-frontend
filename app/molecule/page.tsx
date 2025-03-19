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
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Molecule Details</h1>
          
          <div className="flex flex-col gap-4 w-full">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 justify-center">
                    <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Molecule:</span>
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                        {molecule}
                    </span>
                    </div>
                    <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">SMILES:</span>
                    <span className="rounded-lg bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
                        {smiles}
                    </span>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-center">
                <SmilesToImage smiles={smiles} width={800} height={600} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }