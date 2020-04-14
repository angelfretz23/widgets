import { React, run } from 'uebersicht';

class GitInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: null };
    }

    handleOutput(output) {
        this.setState({ message: output })
    };

    componentDidMount() {
        if (!Boolean(this.props.directory)) {
            return;
        }

        const dir = this.props.directory;
        run(`cd ${dir}; git branch`)
            .then((output) => this.handleOutput(output));
    }

    render() {
        return (<h1>{this.state.message}</h1>);
    }
}

export default GitInfo;