const ROWS_COUNT = 10;
const COLUMNS_COUNT = 12;
const ROWS = [];
const COLUMNS = [];
const CONFIRMED_BOOKINGS = JSON.parse(window.localStorage.getItem('CONFIRMED_BOOKINGS')) || {};


for (let i=0; i <ROWS_COUNT; i++) {
    ROWS.push(String.fromCharCode(65+i));
}

for (let i=0; i <COLUMNS_COUNT; i++) {
    COLUMNS.push(i+1);
}

export { ROWS,  COLUMNS, CONFIRMED_BOOKINGS};