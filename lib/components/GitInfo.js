import { React, run } from 'uebersicht';
import { Snow_Storm } from '../constants';
import Link from './Link';
import Background from './Background';

class GitInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { branch: null, modifiedFiles: null, isSuccessful: true };
    }

    handleOutput(output) {
        const response = output.split('|');
        const branch = response[0].trim();
        const modifiedFiles = response[1];
        this.setState({ branch, modifiedFiles })
    };

    onClick() {
        if (this.props.path) {
            run(`code ${this.props.path}`)
        }
    }
    
    componentDidMount() {
        const dir = this.props.path;
        run(`cd ${dir}; git branch --show-current; echo '|'; git status -s;`)
            .then((output) => this.handleOutput(output));
    }

    get modifiedFiles() {
        const noFilesModified = 'No files have been modified.';

        if (!!!this.state.modifiedFiles) {
            return null;
        }

        return (
            <div className={'heading'} style={headingStyle} >
                {'Modified Files:'}
                <div style={detailsStyle}>
                    {this.state.modifiedFiles.trim() ? this.state.modifiedFiles: noFilesModified}
                </div>
            </div>
        );
    }

    render() {
        if (!this.state.isSuccessful) {
            return null;
        }
        
        return (
            <Background className={'gitInfo'} style={bgStyle} >
                <Link style={ linkStyle } onClick={this.onClick.bind(this)} >{this.props.text}</Link>
                <div className={'heading'} style={headingStyle}>
                    {'Current Branch:'}
                    <div className={'details'} style={detailsStyle}>{'\n' + this.state.branch}</div>
                </div>
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

const project = {
    text: 'Widgets',
    path: '~/development/widgets'
};

const headingStyle = {
    fontFamily: 'Source Han Code JP, Helvetica Neue',
    marginTop: '10px',
    fontWeight: '300',
};

const detailsStyle = {
    marginLeft: '10px',
    whiteSpace: 'pre',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    fontWeight: '100'
}

const bgStyle = {
    padding: '25px',
    color: `${Snow_Storm.nord4}`
};

export default GitInfo;