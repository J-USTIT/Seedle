export const getPhilippinesMidnightDate = () => {
    const now = new Date();
    
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const philippinesTime = new Date(utcTime + 8 * 60 * 60 * 1000);
    philippinesTime.setUTCHours(0, 0, 0, 0);
    return philippinesTime;
};

export const getPhilippinesMidnightDateString = () => {
    const now = new Date();
    
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const philippinesTime = new Date(utcTime + 8 * 60 * 60 * 1000);
    return philippinesTime.toISOString().split('T')[0];
};