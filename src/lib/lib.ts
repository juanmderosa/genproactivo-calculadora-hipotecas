export const getUfChile = async () => {
  const res = await fetch("https://mindicador.cl/api/uf");
  const data = await res.json();

  return data;
};
