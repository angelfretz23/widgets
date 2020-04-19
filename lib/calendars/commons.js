import { css } from 'uebersicht';
import { Snow_Storm } from '../constants';
// This is a change
export const rect = '25px';
export const baseFontSize = '16px';
export const margin = '8px';
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const refreshFrequency = 3600000; // ms

export const className = `
font-family: Source Han Code JP, Helvetica Neue;
color: ${Snow_Storm.nord4};
margin: 20px;
`;

const monthContainer = css`
    padding: 0 0 20px 0;
`;

const headerCss = css`
  padding-left: 5px;
  font-size: ${baseFontSize} * 1.4em;
  margin-bottom: 10px;
`

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

const monthFormatter = monthData => {
    if (!monthData) {
        return;
    }
    const rows = monthData.trim().split('\n');
    const month = rows[0].split(' ')[0];
    return {
        headers: rows[0].split(' ').slice(0, 2),
        weekHeader: rows[1].trim().split(' '),
        weeks: rows.slice(2).map(s => s.match(/.{3}|.{2}$/g)),
        month,
    }
};

export const parser = (output) => {
    const seperated = output.trim().split('|');
    const months = seperated.map(m => m.trim());
    const formattedMonths = months.map(m => monthFormatter(m)).filter( m => Boolean(m));
    return formattedMonths;
};

/* Components */
const header = (month) => <h2 className={headerCss}>{month}</h2>

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


export const yearComponent = (yearCss) => {
    const date = new Date();
    const year = date.getFullYear();
    return (<div className={yearCss}>{year}</div>);
};

export const monthComponent = m => {
    return <div className={monthContainer}>
        {header(...m.headers)}
        {table(m.weekHeader, m.weeks, m.month)}
    </div>
};