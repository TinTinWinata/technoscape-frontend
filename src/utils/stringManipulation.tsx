export const manipulateDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
    ];

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    return formattedDate;
};

export const manipulateMoney = (amount: number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formatter.format(amount);
};

export const manipulateRangeLoan = (range: number) => {
    return range * 30;
};
