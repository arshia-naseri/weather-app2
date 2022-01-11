export default function currentCondition({currentCondition, isMetric}){
    return (
        <>
        <section className="currentConditionSection">
            <section className="currentConditionGroup">
                <section className="currentCondtionDetailsSection">
                    <div className="cityNameDIV">{currentCondition.city}</div>
                    <div className="todayDateDIV">{currentCondition.date}</div>
                    <div className="tempDigitDIV">{isMetric ? currentCondition.tempC:currentCondition.tempF}</div>
                    <div className="feelsDIV">Feels {isMetric ? currentCondition.feelsC:currentCondition.feelsF}</div>
                </section>
                <section className="currentConditionImageSection">
                    <img className="currentConditionImage" src={`./icons/weather-icons/${currentCondition.icon}.svg`}/>
                </section>
            </section>
        </section>
        </>
    )
}