import { React, run, css as CSS } from 'uebersicht';
import { Snow_Storm, ansiColors } from '../constants';
import Link from './Link';
import Background from './Background';

class GitInfo extends React.Component {
    onClick() {
        if (this.props.ide && this.props.path) {
            run(`${this.props.ide} ${this.props.path}`)
        }
    }

    get modifiedFiles() {
        if (!!!this.props.modifiedFiles) {
            return null;
        }
        const rows = this.props.modifiedFiles.split('\n');
        const _rows = rows.slice(2, rows.length - 1)

        return (
            <div className={'heading'} style={headingStyle} >
                {'Modified Files:'}
                <div style={detailsStyle}>
                    {_rows.map((r, i) => {
                        const { spans } = ansiColors.parse(r);
                        const _spans = spans.map( (s, i) => {
                            const {css, text} = s;
                        return (<span className={CSS`${css}`} key={i}>{text}</span>);
                        });
                        return (<div className={'details'} key={i}>{[_spans]} <br /></div>);
                    })}
                </div>
            </div>
        );
    }

    get currentBranch() {
        if (!!!this.props.branch) {
            return null;
        }

        return(
            <div className={'heading'} style={headingStyle}>
                {'Current Branch:'}
                <div className={'details'}>
                    {'\n' + this.props.branch}
                </div>
            </div>
        );
    }

    render() {
        return (
            <Background className={'gitInfo'} style={bgStyle} >
                <Link style={ linkStyle } onClick={this.onClick.bind(this)} >{this.props.text}</Link>
                {this.currentBranch}
                {this.modifiedFiles}
            </Background>
        );
    }
}

const linkStyle = {
    color: `${Snow_Storm.nord4}`,
    fontFamily: 'Source Han Code JP, Helvetica Neue',
    cursor: 'pointer',
    margins: '0',
    padding: '0',
    textDecoration: 'underline',
};


const headingStyle = {
    fontFamily: '"Source Han Code JP", Helvetica Neue',
    fontSize: '12px',
    marginTop: '10px',
    fontWeight: 'bold',
};

const detailsStyle = {
    whiteSpace: 'pre',
};

const bgStyle = {
    padding: '25px',
    color: `${Snow_Storm.nord4}`,
    maxWidth: '700px',
};

export default GitInfo;