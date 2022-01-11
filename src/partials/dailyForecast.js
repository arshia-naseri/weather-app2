import MblDailyForecastTile from './_dailyForecastTileMobile'
import DskDailyForecastTile from './_dailyForecastTileDesktop'

export default function dailyForecast({dailyForecast, isMetric, isDayTime}){

    return (
        <>
        <section className="dailyForecastSection panels">
            <section className="dailyForecastGroup dailyForecastGroup--mobile">
                {dailyForecast.map(elm => {
                    return <MblDailyForecastTile key={elm.key} isDayTime={isDayTime} isMetric={isMetric} dailyForecast={elm}/>
                })}
            </section>
            <section className="dailyForecastGroup dailyForecastGroup--desktop">
                {dailyForecast.map(elm => {
                    return <DskDailyForecastTile key={elm.day} isDayTime={isDayTime} isMetric={isMetric} dailyForecast={elm}/>
                })}
            </section>
        </section>
        </>
    )
}