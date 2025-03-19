import { BASE_URL } from "../utils/config";

export const fetchMolecule = async (molecule: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/molecule?molecule=${molecule}`);
    if (!res.ok) throw new Error("Failed to fetch molecule");
    return {
      data: await res.json(),
      error: null
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message
    };
  }
};
