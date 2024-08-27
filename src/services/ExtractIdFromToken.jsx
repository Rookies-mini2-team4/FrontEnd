const ExtractIdFromToken = (token) => {
  if (!token) return null;

  try {
    // Split the token into its three parts
    const [, payload] = token.split('.');

    // Decode the base64 payload
    const decodedPayload = atob(payload);

    // Parse the JSON payload
    const payloadObj = JSON.parse(decodedPayload);

    // Extract the ID (assuming it's stored under the key 'id')
    return payloadObj.sub || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default ExtractIdFromToken;
