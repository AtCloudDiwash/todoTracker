
const getCurrentWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
  
    const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diffToSunday); 
    startOfWeek.setHours(0, 0, 0, 0); 
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); 
    endOfWeek.setHours(23, 59, 59, 999);
  
    return { startOfWeek, endOfWeek };
  };
  

  const getCurrentMonthRange = () => {
    const today = new Date();
    
  
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    
  
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999); 
    
    return { startOfMonth, endOfMonth };
  };

  export { getCurrentMonthRange, getCurrentWeekRange };
  