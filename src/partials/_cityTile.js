export default function cityTile({sideMenuCityClick, cityName, city}){
    return(
        <section onClick={sideMenuCityClick}className={`cityTileSection ${cityName===city?'citySelected':''}`}>
            <div className="cityName">{city}</div>
        </section>
    )
}