
export const fetchFakerData = async (url) => {
  try {
    const response = await fetch(url);
    const body = await response.json();
    return { success: true, body };
  } catch (error) {
    return { success: false, error };
  }
};
