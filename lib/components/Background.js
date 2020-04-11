import { React } from 'uebersicht';

class Background extends React.Component {
    render() {
        return (<div className={'background'} style={{...style, ...this.props.style }}>
            {this.props.children}
        </div>)
    }
}

const style = {
    background: 'rgba(0, 0, 0, 0.3)',
    borderWidth: '1px',
    borderStyle: 'outset',
    borderRadius: '20px',
    padding: '25px'
};

export default Background;