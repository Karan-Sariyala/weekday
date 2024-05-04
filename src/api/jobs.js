const API_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

const fetchJobs = async (limit, offset) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ limit, offset }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data;
};

export default fetchJobs;
