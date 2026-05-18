export const getPhilippinesDate = () => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const philippinesTime = new Date(utcTime + 8 * 60 * 60 * 1000);
    return philippinesTime;
};

export const getPhilippinesMidnightDate = () => {
    const now = new Date();
    // Convert to UTC milliseconds, then add 8 hours for Philippines time
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const philippinesTime = new Date(utcTime + 8 * 60 * 60 * 1000);
    philippinesTime.setUTCHours(0, 0, 0, 0);
    return philippinesTime;
};
