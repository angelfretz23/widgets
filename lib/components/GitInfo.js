import { React, run } from 'uebersicht';
import { Snow_Storm } from '../constants';
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

        const noFilesModified = '\nNo files have been modified.';

        return (
            <div className={'heading'} style={headingStyle} >
                {'Modified Files:'}
                <div style={detailsStyle}>
                    {!!this.props.modifiedFiles.trim() ? this.props.modifiedFiles: noFilesModified}
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
                <div className={'details'} style={detailsStyle}>
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
    fontSize: '25px',
    textDecoration: 'underline',
};


const headingStyle = {
    fontFamily: 'Source Han Code JP, Helvetica Neue',
    marginTop: '10px',
    fontWeight: 'bold',
};

const detailsStyle = {
    marginLeft: '10px',
    whiteSpace: 'pre',
    fontFamily: '"Lucida Console", Monaco, monospace',
    fontSize: '12px',
    fontWeight: '200',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}

const bgStyle = {
    padding: '25px',
    color: `${Snow_Storm.nord4}`,
    maxWidth: '700px',
};

export default GitInfo;