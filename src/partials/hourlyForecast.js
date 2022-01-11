import HourlyForecastTile from "./_hourlyForecastTile"

export default function hourlyForecast({hourlyForecast, isMetric}){
    return (
        <>
        <section className="hourlyForecastSection panels">
            <section className="hourlyForecastGroup">
                {hourlyForecast.map(element => {
                    return <HourlyForecastTile key={element.key} 
                    time={element.time} icon={element.icon}
                    tempC={element.tempC} tempF={element.tempF} isMetric={isMetric} />
                })}
            </section>
        </section>
        </>
    )
}