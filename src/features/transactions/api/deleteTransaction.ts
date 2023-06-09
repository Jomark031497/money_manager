export const deleteTransaction = async (id: string) => {
  const response = await fetch(`/api/txns/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));
  return data;
};
