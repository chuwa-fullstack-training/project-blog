export default async function apiCall({ url, method, data, headers }) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const { error } = await response.json();
    console.log(error);
    throw new Error(error.message);
  }
  const result = await response.json();
  return result;
}
