function selector ({id , name , label , options , filters , setFilters})  {
    function changeHandel(e) {
        setFilters({...filters , [e.target.name] : e.target.value})
        console.log(filters)
    }

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select name={name} id={id} value={filters[name]} onChange={changeHandel}>
                {options.map(item => {
                    return (<option key={item} value={item}>{item}</option>)
                })}
            </select>
        </div>
    )
}

export default selector