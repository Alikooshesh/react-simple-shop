function selector ({id , label , options , startValue})  {
    console.log(options)
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={startValue}>
                {options.map(item => {
                    return (<option value={item}>{item}</option>)
                })}
            </select>
        </div>
    )
}

export default selector