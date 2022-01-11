export default function currentDetails({currentDetails, isDayTime, isMetric}){
    return (
        <>
        <section className="currentDetailsSection panels">
            <section className="perceptionSection">
                <img className="perceptionImage" src="./icons/raindrop.svg"/>
                <div className="perceptionLabel">Precipitation</div>
                <div className="perceptionValueDIV">{isDayTime?currentDetails.dayPrecipitation:currentDetails.nightPrecipitation}</div>
            </section>

            <section className="humidSection">
                <img className="humidImage" src="./icons/humid.svg"/>
                <div className="humidLabel">Humid</div>
                <div className="humidValueDIV">{currentDetails.humid}</div>
            </section>

            <section className="windSpeedSection">
                <img className="windSpeedImage" src="./icons/wind.svg"/>
                <div className="windSpeedLabel">Wind Speed</div>
                <div className="windSpeedValueDIV">{isMetric?currentDetails.windMetric:currentDetails.windImperial}</div>
            </section>

            <section className="dayNightSection">
                <img className="dayNightImage" src="./icons/daynight.svg"/>
                <div className="dayNightLabel">DayandNight</div>
                <div className="dayNightValueDIV">{currentDetails.rise}{currentDetails.set}</div>
            </section>
        </section>
        </>
    )
}