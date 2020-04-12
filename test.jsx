import Month from './lib/calendars/Month';
import { parser } from './lib/calendars/commons';

export const refreshFrequency = 10000;

export const command = 'cal -h April 2020'

export const className = `
    top: 20px;
    left: 20px;
`;

export const render = ({ output }) => {
    const data = parser(output);
    const month = data[0].month;
    const body = { ...data[0] };
    return (<Month month={month} body={body} />);
}