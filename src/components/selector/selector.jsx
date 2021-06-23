function selector ({id , name , label , options , filters , setFilters})  {
    function changeHandel(e) {
        if (e.target.name === "size_selector"){
            setFilters({[e.target.name] : e.target.value})
        }else {
            setFilters({...filters , [e.target.name] : e.target.value})
        }

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