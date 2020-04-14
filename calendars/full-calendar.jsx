import { css } from 'uebersicht';
import {
  className,
  months,
  refreshFrequency,
  parser,
  yearComponent,
  monthComponent,
} from '../lib/calendars/commons';
import Month from '../lib/calendars/Month';
import { bgColor_66alpha } from '../lib/constants';

export const containerCss = css`
    background: ${bgColor_66alpha};
    padding: 50px 50px 30px 50px;
    border-radius: 20px;
    border-style: outset;
    border-width: 1px;
`
export const monthsContainer = css`
    display: flex;
    width: 525px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const yearCss = css`
    font-size: 90px;
    margin-bottom: 10px;
`;

const commandBuilder = () => {
    const date = new Date();
    const year = date.getFullYear();
    return months.reduce( (p, c) => p + `cal -h ${c} ${year}; echo "|";`, '');
};

export const command = commandBuilder();

export const render = ({ output, error }) => {
    const o = parser(output);
    return o && o.length ? <div className={containerCss}>
        { yearComponent(yearCss) }
        <div className={monthsContainer} >
            {o.map( (m, i) => m ? <Month { ...m } key={i}/> : null)}
        </div>
    </div> : null;
};

export { refreshFrequency, className }