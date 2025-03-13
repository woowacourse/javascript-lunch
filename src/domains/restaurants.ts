export interface Restaurant {
  id: string;
  category: string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  isFavorite?: boolean;
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/restaurants`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: Restaurant[] = await response.json();
    return data;
  } catch (error) {
    alert("데이터를 불러오지 못했습니다. 다시 시도해주세요.");
    return [];
  }
}
