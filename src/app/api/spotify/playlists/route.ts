import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token;
  } catch (err) {
    console.error('Error Spotify Token:', err);
    return null;
  }
}

export async function GET() {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 401 });
  }

  // MASUKKAN DAFTAR ID PLAYLIST SPOTIFY KAMU DI SINI (BISA SEBANYAK APA PUN)
  const playlistIds = [
    '3v6lpzQWgsT5ydXJnriB69',
    '45JYkYICVKOXTH7DzSvdJr',
    '0zL5PIu39HSUAqvmLB4vfw',
    '5VcBUumXlAvwTBjNXcXzWM',
    '37i9dQZF1EIVUfSnR3KGu7'
  ];

  try {
    const promises = playlistIds.map((id) =>
      fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }).then((res) => (res.ok ? res.json() : null))
    );

    const results = await Promise.all(promises);
    const validPlaylists = results.filter(Boolean).map((item: any) => ({
      id: item.id,
      name: item.name,
      owner: item.owner?.display_name || 'Spotify User',
      cover: item.images?.[0]?.url || '',
    }));

    return NextResponse.json({ playlists: validPlaylists });
  } catch (error) {
    console.error('Error fetching Spotify playlists:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}