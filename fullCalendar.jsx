import { css } from "uebersicht"

const rect = '25px';
const baseFontSize = '16px';
const margin = '8px';

export const className = `
  font-family: Source Han Code JP, Helvetica Neue;
  color: #fff;
  top: 250px;
  left: 40px;
  `
export const containerCss = css`
    background: rgba(0, 0, 0, 0.3);
    padding: 50px 50px 30px 50px;
    border-radius: 20px;
    border-style: outset;
    border-width: 1px;
`
export const calendarBody = css`
    display: flex;
    width: 525px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const monthContainer = css`
    padding: 0 0 20px 0;
`;
export const yearCss = css`
    font-size: 90px;
    margin-bottom: 10px;
`;

//////////////// header ////////////////
const headerCss = css`
  padding-left: 5px;
  font-size: ${baseFontSize} * 1.4em;
  margin-bottom: 10px;
`

//////////////// table ////////////////
const tableCss = css`
  border-collapse: collapse;
  table-layout: fixed;
  font-size: ${baseFontSize};

  th {
    display: inline-block;
    width: ${rect};
    height: ${rect};
    text-align: center;
    font-size: ${baseFontSize};
    font-weight: bold;
  }
  th:not(:first-of-type) {
    margin-left: ${margin};
  }

  td {
    display: inline-block;
    width: ${rect};
    height: ${rect};
    text-align: center;
    line-height: ${rect};
  }
  td:not(:first-of-type) {
    margin-left: ${margin};
  }
`
const todayDecoCss = css`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.3;
`

const todayCss = css`
  position: relative;
  font-weight: bold;
  text-shadow: 1px 1px #555;
`

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const commandBuilder = () => {
    const date = new Date();
    const year = date.getFullYear();
    return months.reduce( (p, c) => p + `cal -h ${c} ${year}; echo "|";`, '');
};

export const refreshFrequency = 3600000; // ms

export const command = commandBuilder();

const parser = output => {
    const seperated = output.trim().split('|');
    const months = seperated.map(m => m.trim());
    const formattedMonths = months.map(m => monthFormatter(m)).filter( m => Boolean(m));
    return formattedMonths;
};
const header = (month, year) => <h2 className={headerCss}>{month}</h2>
const monthFormatter = monthData => {
    if (!monthData) {
        return;
    }
    const rows = monthData.trim().split('\n');
    const month = rows[0].split(' ')[0];
    return {
        headers: rows[0].split(' ').slice(0, 2),
        tableHeaderRow: rows[1].trim().split(' '),
        tableBodyRows: rows.slice(2).map(s => s.match(/.{3}|.{2}$/g)),
        month,
    }
};
const table = (headers, bodies, month) => {
    const date = new Date();
    const currentMonthIndex = date.getMonth();
    const currentMonth = months[currentMonthIndex];
    const today = date.getDate();

    return <table className={tableCss}>
    <thead>
      <tr>
        { headers.map(s => <th>{s}</th>) }
      </tr>
    </thead>
    <tbody>
      { bodies.map(row => 
        <tr>
          { row.map(s=> {
              const isToday = currentMonth === month && s.trim() == today;
            return isToday ? <td className={todayCss}><span className={todayDecoCss}/>{s}</td> : <td>{s}</td> 
          })}
        </tr>) 
      }
    </tbody>
  </table>
}

const monthComponent = m => {
    return <div className={monthContainer}>
        {header(...m.headers)}
        {table(m.tableHeaderRow, m.tableBodyRows, m.month)}
    </div>
};

const yearComponent = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (<div className={yearCss}>{year}</div>);
};


export const render = ({ output, error }) => {
    const o = parser(output);
    return o && o.length ? <div className={containerCss}>
        { yearComponent() }
        <div className={calendarBody} >
            {o.map(m => m ? monthComponent(m) : null)}
        </div>
    </div> : null;
};