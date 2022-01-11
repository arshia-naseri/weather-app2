export default function hourlyForecastTile({time, icon, tempC, tempF, isMetric}){
    return (
        <>
        <section className="hourlyForecastTile">
            <div className="hourlyForecastTileTime">{time}</div>
            <img className="hourlyForecastTileImage" src={"./icons/weather-icons/"+icon+".svg"}/>
            <div className="hourlyForecastTileTemp">
                {isMetric ? tempC + "°C": tempF + "°F"}
            </div>
        </section>
        </>
    )
}