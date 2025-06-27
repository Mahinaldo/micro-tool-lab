
export const useToolOfTheDay = (tools: any[]) => {
  // Use date as seed for consistent daily selection
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Simple seeded random
  const dailyIndex = seed % tools.length;
  
  return tools[dailyIndex];
};
