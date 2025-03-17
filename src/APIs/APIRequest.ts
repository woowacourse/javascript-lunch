const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  return await response.json();
}
