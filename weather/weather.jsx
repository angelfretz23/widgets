import Background from "../lib/components/Background";

export const refreshFrequency = 1000 * 60;

const iframe = '<iframe id="forecast_embed" frameborder="0" height="245" width="100%" src="https://forecast.io/embed/#lat=33.6102&lon=-111.8745&name=Scottsdale&color=#ffffff&text-color=#ffffff"></iframe>';

const weather = (
    <div dangerouslySetInnerHTML={{ __html: iframe }} />
);

export const render = () => (
    <Background style={backgroundStyle}>
        {weather}
    </Background>
);

export const className = `
    margin-left: 20px;
    top: 330px;
    width: 724px;
`;


const backgroundStyle = {
    padding: '35px 25px 0px 25px',
}

export default weather;