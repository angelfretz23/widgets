export const refreshFrequency = 1000 * 60;

const iframe = '<iframe id="forecast_embed" frameborder="0" height="245" width="100%" src="https://forecast.io/embed/#lat=33.6102&lon=-111.8745&name=Scottsdale&color=#ffffff&text-color=#ffffff"></iframe>';

const weather = (
    <div dangerouslySetInnerHTML={{ __html: iframe }} />
);

export const render = () => (
    weather
);

export const className = `
    left: 20px;
    top: 20px;
    width: 800px;
`;

export default weather;