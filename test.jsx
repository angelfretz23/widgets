
import { css } from 'uebersicht';
import GitInfo from './lib/components/GitInfo';
import Link from './lib/components/Link';
import Background from './lib/components/Background';
import { Polar_Night, Aurora, Snow_Storm } from './lib/constants';

export const refreshFrequency = 1000 * 10; // 15 seconds

export const command = 'cd ~/development/widgets; git status -s'

export const className = css`
    top: 20px;
    left: 20px;
    fontFamily: 'Source Han Code JP, Helvetica Neue',
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

const project = {
    text: 'Widgets',
    path: '~/development/widgets'
};

export const render = () => {
    return (
        <GitInfo {...project}/>
    );
};