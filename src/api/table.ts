export async function getTableData(page: number = 1) {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
  const data = res.json();
  return data;
}
