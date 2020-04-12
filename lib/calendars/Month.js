import { React, css } from 'uebersicht';
import { months } from './commons';

class Month extends React.Component {

    get headers() {
        return (
            <h2 className={'header'} style={headerStyle}>
                {this.props.month}
            </h2>
        );
    }
    get body() {
        const date = new Date();
        const currentMonthIndex = date.getMonth();
        const currentMonth = months[currentMonthIndex];
        const today = date.getDate();

        return (
        <table className={tableStyle}>
            <thead>
                <tr>
                    { this.props.weekHeader.map((s, i) => <th key={`${s}${i}`}>{s}</th>) }
                </tr>
            </thead>
            <tbody>
                { this.props.weeks.map( (week, i) => 
                    <tr key={i}>
                        { week.map((day, index) => {
                                const isToday = currentMonth === this.props.month && day.trim() == today;
                                return isToday ? <td className={'today'} style={todayStyle} key={`${i}${index}`}><span className={'todayIndicator'} style={todayIndicatorStyle}/>{day}</td> : <td key={`${i}${index}`}>{day}</td> 
                            })
                        }
                    </tr>) 
                }
            </tbody>
        </table>);
    }
    render() {
        if (!Boolean(this.props.month) && !Boolean(weekHeader) && Boolean(weeks)) {
            return null;
        }
        return(
            <div className={'month'} style={{ ...style, ...this.props.style }}>
                { this.headers }
                { this.body }
            </div>
        )
    }
}


const rect = '25px';
const baseFontSize = '16px';
const margin = '8px';

const style = {
    padding: '0 0 20px 0',
    fontFamily: 'Source Han Code JP, Helvetica Neue',
    color: '#fff',
};

const headerStyle = {
    paddingLeft: '5px',
    fontSize: `${baseFontSize} * 1.4em`,
    marginBottom: '10px',
}

const todayStyle = {
    position: 'relative',
    fontWeight: 'bold',
    textShadow: '1px 1px #555',
};

const todayIndicatorStyle = {
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '50%',
    opacity: '0.3',
};

const tableStyle = css`
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

export default Month;