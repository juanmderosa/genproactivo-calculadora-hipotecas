export const getUfChile = async () => {
  try {
    const res = await fetch("https://mindicador.cl/api/uf");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching UF Value: ${error}`);
  }
};
