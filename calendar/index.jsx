
const commandBuilder = () => {
    const date = new Date();
    const year = date.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.reduce( (p, c) => p + `cal ${c} ${year}; echo "|";`, '');
};

export const refreshFrequency = 3600000; // ms

export const command = commandBuilder();

const parser = output => {
    const seperated = output.trim().split('|');
    const months = seperated.map(m => m.trim());
    const formattedMonths = months.map(m => monthFormatter(m)).filter( m => Boolean(m));
    return formattedMonths;
};

const monthFormatter = monthData => {
    if (!monthData) {
        return;
    }
    const rows = monthData.trim().split('\n');
    return {
        headers: rows[0].split(' ').slice(0, 2),
        tableHeaderRow: rows[1].trim().split(' '),
        tableBodyRows: rows.slice(2).map(s => s.match(/.{3}|.{2}$/g)),
    }
};

export const render = ({ output }) => {
    const o = parser(output);
    return (<div/>)
};