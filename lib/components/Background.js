import { React } from 'uebersicht';
import { bgColor_66alpha } from '../constants';

class Background extends React.Component {
    render() {
        return (<div className={'background'} style={{...style, ...this.props.style }}>
            {this.props.children}
        </div>)
    }
}

const style = {
    background: `${bgColor_66alpha}`,
    borderWidth: '1px',
    borderStyle: 'outset',
    borderRadius: '20px',
    padding: '25px'
};

export default Background;