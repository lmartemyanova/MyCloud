export function preserveFileExtension(originalName, newName) {
    const originalParts = originalName.split('.');
    const newParts = newName.split('.');
  
    if (originalParts.length < 2) return originalName; 
  
    const extension = originalParts.pop();
    const baseName = newParts.slice(0, -1).join('.') || newName; 
  
    return `${baseName}.${extension}`;
}