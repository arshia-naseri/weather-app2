export default function navBar({navBarCityClick, cityName, cities, isDayTime, isMetric, toggleMetric, aboutSectionAlert}) {
    return (
        <section className={`navBarSection ${isDayTime ? '':'nightMode'}`}>
            <section className="citySection">
                {cities.map(city => {
                    return (
                        <section key={city} onClick={navBarCityClick} className={`cityTile ${cityName===city?'cityNavSelected':''}`}><div className="cityName">{city}</div></section>
                    )
                })}
            </section>
            <section className="userProperties">
                <section onClick={aboutSectionAlert} className="aboutSection"><div>?</div></section>
                <section onClick={toggleMetric} className={`metricSection ${isMetric?'navBarMetricActivated':''}`}><div>°C</div></section>
            </section>
        </section>
    )
}