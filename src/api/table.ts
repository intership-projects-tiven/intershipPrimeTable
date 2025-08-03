export type Pagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
};
export type TableData = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
};
export interface DataType {
  pagination: Pagination;
  data: TableData[];
}

export async function getTableData({
  page = 1,
  limit = 8,
  fields,
}: {
  page?: number;
  limit?: number;
  fields?: string[] | string;
}): Promise<DataType> {
  const selectedFields = Array.isArray(fields) ? fields.join(",") : fields;
  let url = `https://api.artic.edu/api/v1/artworks?page=${page}&&limit=${limit}`;
  if (fields) url += `&&fields=${selectedFields}`;
  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
