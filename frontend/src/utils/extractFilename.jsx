export function extractFilename(contentDisposition, fallbackName = "downloaded-file") {
    if (!contentDisposition) return fallbackName;
  
    // filename*=UTF-8''encoded.txt
    const utf8Match = contentDisposition.match(/filename\*\=UTF-8''(.+)/i);
    if (utf8Match) {
      try {
        return decodeURIComponent(utf8Match[1]);
      } catch {
        return fallbackName;
      }
    }
  
    // filename="plain.txt"
    const asciiMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
    if (asciiMatch) {
      return asciiMatch[1];
    }
  
    return fallbackName;
  }
  