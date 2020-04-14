import { css } from 'uebersicht';
import {
  className,
  months,
  refreshFrequency,
  parser,
  yearComponent,
} from '../lib/calendars/commons';
import Month from '../lib/calendars/Month';
import Background from '../lib/components/Background';

export const containerCss = css`
    background: rgba(0, 0, 0, 0.3);
    padding: 25px;
    border-radius: 20px;
    border-style: outset;
    border-width: 1px;
    width: 900px;
    
`
export const calendarBody = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
    margin-left: 10px;
`;

export const yearCss = css`
    font-size: 56px;
    width:60px;
    word-wrap: break-word;
    line-height: 90%
    
`;

const commandBuilder = () => {
    const date = new Date();
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const lastMonthAndAfter = months.slice(monthIndex - 1, monthIndex + 2);
    return lastMonthAndAfter.reduce( (p, c) => p + `cal -h ${c} ${year}; echo "|";`, '');
};

export const command = commandBuilder();

const bgStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '900px',
}

export const render = ({ output }) => {
    const o = parser(output);

    const calendar = (
        <Background style={bgStyle}>
            { yearComponent(yearCss) }
            <div className={calendarBody} >
                { o.map((m, i) => m ? <Month { ...m } key={i}/> : null) }
            </div>
        </Background>
    );

    return o && o.length ? calendar : null;
};

export { refreshFrequency, className }