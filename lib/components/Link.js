import { React, run } from 'uebersicht';
import { Frost } from '../constants';

class Link extends React.Component {

    render () {
       return (
       <a
       onClick={this.props.onClick}
       style={{ ...style, ...this.props.style }}>
            {this.props.children}
        </a>);
    }
}

const style = {
    cursor: 'pointer',
    color: `${Frost.nord7}`
}


export default Link;

