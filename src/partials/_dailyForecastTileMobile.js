export default function dailyForecastTile({dailyForecast, isMetric, isDayTime}){
    return (
        <>
        <section className='dailyForecastDaySection'><div>{dailyForecast.day}</div></section>
        <section className='dailyForecastImageSection'><img className="dailyForecastImage" src={`./icons/weather-icons/${isDayTime?dailyForecast.dayIcon: dailyForecast.nightIcon}.svg`}/></section>
        <section className='dailyForecastLowDigitSection'>
            <div>{isMetric ? dailyForecast.lowC : dailyForecast.lowF}</div>
        </section>
        <section className='dailyForecastHighDigitSection'>
            <div>{isMetric ? dailyForecast.highC : dailyForecast.highF}</div>
        </section>
        </>
    )
}