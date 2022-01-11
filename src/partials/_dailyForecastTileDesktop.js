export default function dailyForecastTile({isMetric, dailyForecast, isDayTime}){
    return (
        <>
        <section className="dailyForecastTile">
            <section className='dailyForecastDaySection'><div>{dailyForecast.day}</div></section>
            <section className='dailyForecastImageSection'><img className="dailyForecastImage" src={`./icons/weather-icons/${isDayTime?dailyForecast.dayIcon: dailyForecast.nightIcon}.svg`}/></section>
            <section className='dailyForecastDigitsSection'>
                <div>{isMetric ? dailyForecast.lowC : dailyForecast.lowF}</div>
                <div>{isMetric ? dailyForecast.highC : dailyForecast.highF}</div>
            </section>
        </section>
        </>
    )
}