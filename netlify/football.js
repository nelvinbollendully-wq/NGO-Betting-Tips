export default async (request, context) => {
  const API_KEY = process.env.RAPIDAPI_KEY;
  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

  try {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get("endpoint");

    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "No endpoint provided" }),
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
};