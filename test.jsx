
import { css } from 'uebersicht';
import GitInfo from './lib/components/GitInfo';

export const refreshFrequency = 15 * 1000; // 15 seconds

export const command = 'cd ~/development/widgets; git status -s'

export const className = css`
    top: 20px;
    left: 20px;

    .unstaged_modified {
        color: red;
    }

    .staged_modified {
        color: #008000;
    }

    .unstaged_staged_modified {
        color: purple;
    }

    .untracked {
        color: yellow;
    }
`;

const GIT_STATUS_STATES = {
    ' M': 'unstaged_modified',
    'M ': 'staged_modified',
    'MM': 'unstaged_staged_modified',
    '??': 'untracked',
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
};

// export const render = ({ output }) => {
//     const lines = output.split('\n');
//     return (
//         <div>
//             {lines && lines.length ? lines.map((l, i) => {
//                 if (!Boolean(l)) {
//                     return null;
//                 }
//                 const gitStatusState = GIT_STATUS_STATES[l.slice(0, 2)];
//                 return(
//                 <div className={gitStatusState} key={i}>
//                     {l}
//                 </div>);
//             }) : null}
//         </div>
//     );
// };

export const render = () => {
    return (<GitInfo />);
};