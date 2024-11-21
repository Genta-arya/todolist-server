export const handleError = async (
  res,
  error,
  customMessage = "Terjadi kesalahan pada server"
) => {
  console.error(error);

  return res.status(500).json({ message: customMessage, Detail: error });
};
