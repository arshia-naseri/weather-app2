import CityTile from "./_cityTile"

export default function sideMenu({sideMenuCityClick, cityName, cities, isDayTime, isMetric,openSideMenu,toggleMetric}){
    return (
        <>
        <div onClick={openSideMenu} className="btnSideBar"></div>
        <section className={`sideMenuSection ${isDayTime ? '':'nightMode'}`}>
            <section className="SideMenuGroup">
                <section className="sideMenuProperties">
                    <section className="citySection">
                        {cities.map(city => {
                            return <CityTile key={city} sideMenuCityClick={sideMenuCityClick} cityName={cityName}city={city}/>
                        })}
                    </section>
                    <section className="metricSection">
                        <div className="lblMetric">Metric</div>
                        <div onClick={toggleMetric} className={`btnToggle ${isMetric?'toggleMetricActivated':''}`}><div></div></div>
                    </section>
                </section>
                <section className="copyRightSection">
                    <div>Copyright Arshia Naseri</div>
                </section>
            </section>
        </section>
        </>
    )
}
