export const imageUrl = (path) => {
    if (!path || typeof path !== "string") {
      return "";
    }
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    } else {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      return `${baseUrl}/files${path}`;
    }
  };