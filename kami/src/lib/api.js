export async function getStartups() {
    const response = await fetch("app/api/entrepreneurs/route.js");
    if (!response.ok) {
      throw new Error("Failed to fetch startups");
    }
    return response.json();
  }