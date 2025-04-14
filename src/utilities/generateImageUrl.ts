export const generateImageUrl = (image: string | null) => {
  if (!image) return undefined;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = `${baseUrl}/uploads/${image}`;

  return imageUrl;
};
