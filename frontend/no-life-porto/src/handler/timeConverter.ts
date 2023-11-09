export default function timeAgo(dateString: string | Date) {
    const currentDate: any = new Date();
    const inputDate: any = new Date(dateString);
    const timeDifference = currentDate - inputDate;

    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    // Calculate the time difference in various units
    const yearsAgo = Math.floor(timeDifference / year);
    const monthsAgo = Math.floor(timeDifference / month);
    const weeksAgo = Math.floor(timeDifference / week);
    const daysAgo = Math.floor(timeDifference / day);
    const hoursAgo = Math.floor(timeDifference / hour);
    const minutesAgo = Math.floor(timeDifference / minute);
    const secondsAgo = Math.floor(timeDifference / 1000);

    // Return the appropriate "ago" format
    if (yearsAgo > 1) {
        return `${yearsAgo} years ago`;
    } else if (monthsAgo > 1) {
        return `${monthsAgo} months ago`;
    } else if (weeksAgo > 1) {
        return `${weeksAgo} weeks ago`;
    } else if (daysAgo > 1) {
        return `${daysAgo} days ago`;
    } else if (hoursAgo > 1) {
        return `${hoursAgo} hours ago`;
    } else if (minutesAgo > 1) {
        return `${minutesAgo} minutes ago`;
    } else {
        return `${secondsAgo} seconds ago`;
    }
}

