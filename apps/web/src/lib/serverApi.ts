import { cookies } from 'next/headers';

export async function serverFetch<T>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const res = await fetch(
    `${process.env.API_URL ?? 'http://localhost:3000'}${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Error fetching ${path}: ${res.status}`);
  }

  return res.json();
}
