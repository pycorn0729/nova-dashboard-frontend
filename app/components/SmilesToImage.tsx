"use client";

import { useEffect, useRef, useState } from "react";
const SmilesDrawer = require("smiles-drawer");

const SmilesToImage = ({ smiles, width = 300, height = 300 }: { smiles: string, width?: number, height?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (smiles && canvasRef.current) {
      setIsLoading(true);
      try {
        const options = { width, height };
        const drawer = new SmilesDrawer.Drawer(options);
        
        SmilesDrawer.parse(smiles, (tree: any) => {
          drawer.draw(tree, canvasRef.current, "light");
          setIsLoading(false);
        }, (error: any) => {
          setError('Failed to draw molecule structure. Please check if SMILES string is valid.');
          setIsLoading(false);
        });
      } catch (error) {
        setError('Failed to draw molecule structure. Please check if SMILES string is valid.');
        setIsLoading(false);
      }
    }
  }, [smiles]);

  if (!smiles || error) {
    return <div className="text-red-500">Invalid SMILES string: {error}</div>;
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={300} height={300} className={isLoading ? 'opacity-50' : ''} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default SmilesToImage;
