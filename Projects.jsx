
import { css, run } from 'uebersicht';
import GitInfo from './lib/components/GitInfo';
import { projects as p } from './lib/git/constants';

// DEPENDENCIES
// https://github.com/knugie/git-status-tree

export const refreshFrequency = 1000; // 15 seconds

const FLEX_STYLE = {
    MOSAIC: 0,
    LIST: 1
};

const PREFERRED_STYLE = FLEX_STYLE.LIST;

const mosaicClassName = css`
padding: 20px;
fontFamily: Source Han Code JP, Helvetica Neue;
width: 100%;

    .container {
        display: flex;
        flex-flow: column wrap;
        height: 100vh;
        width: 100%;
        overflow:scroll;
    }

    .gitInfo {
        margin-bottom: 20px;
        margin-right: 20px;
    }

    .gitInfo:nth-child(2n+1) {
        order: 1;
        flex-grow: 1;
    }
    .gitInfo:nth-child(2n) {
        order: 2;
        flex-grow: 2;
    }

    .container::before,
    .container::after {
        content: "";
        flex-basis: 100%;
        width: 0;
        order:2;
    }
`;
const listClassName = css`
    fontFamily: Source Han Code JP, Helvetica Neue;
    overflow: visible;
    margin-left: 20px;
    left: 744px;

        .container {
            display: flex;
            flex-flow: column nowrap;
            overflow-y: scroll;
            height: 52.5vh;
            scroll-snap-type: y mandatory;
            scroll-padding-top: 20px;
            align-items: flex-start;
            border-radius: 10px;
        }

        .container::-webkit-scrollbar {
            display: none;
        }


        .gitInfo:not(:last-of-type) {
            margin-bottom: 20px; 
        }

        .gitInfo:first-of-type {
            margin-top: 20px;
        }

`

const getClassName = () => {
    switch (PREFERRED_STYLE) {
        case FLEX_STYLE.LIST:
            return listClassName;
        case FLEX_STYLE.MOSAIC:
            return mosaicClassName;
    }
};

export const className = getClassName();

const IDE = {
    code: 'code',
    intellij: 'idea',
}

const projects = p || [
    {
        text: 'Widgets',
        path: '~/development/widgets',
        ide: IDE.code,
    },
    {
        text: 'Core Service',
        path: '~/development/core_services/core_service',
        ide: IDE.intellij,
    },
];

const commandBuilder = (projects) => {
    return projects.reduce((p, c) => p + `cd ${c.path}; git branch --show-current; echo '|'; git tree; echo '||';`, '');
}


export const command = (dispatch) => run(commandBuilder(projects))
    .then((response) => {
        try {
            const splitResponse = response.split('||');
            const data = splitResponse.slice(0, splitResponse.length - 1)
                .map( (s, i) => {
                    const project = projects[i];
                    const response = s.split('|');
                    const branch = response[0].trim();
                    const modifiedFiles = response[1];
                    return { ...project, branch, modifiedFiles };
                });
            dispatch({ type: 'FETCH_SUCCEDED', data })
        } catch (e) {
            console.error(e);
        }
    });

export const updateState = (event, previousState) => {
   switch (event.type) {
       case 'FETCH_SUCCEDED': {
            return { data: event.data };
       }
       default: {
           return previousState;
       }
   }
}

export const render = (event) => {
    try {
        const { data } = event;
        return (
            <div className={'container'}>
                {data.map( (project, i) => <GitInfo className={'gitInfo'} {...project} key={i}/>)}
            </div>
        );
    } catch (e) {
        console.error(e);
        return null;
    }
};