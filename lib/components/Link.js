import { React, run } from 'uebersicht';
import { Frost } from '../constants';

class Link extends React.Component {

    render () {
       return (
       <a onClick={this.props.onClick}>
           <h2 style={{ ...style, ...this.props.style }}>
                {this.props.children}
            </h2>
        </a>);
    }
}

const style = {
    cursor: 'pointer',
    color: `${Frost.nord7}`
}


export default Link;

