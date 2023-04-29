export const deleteWallet = async (id: string) => {
  const response = await fetch(`/api/wallets/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));
  return data;
};
