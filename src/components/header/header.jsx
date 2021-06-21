import './header.css'

function header({title}) {
    return (
        <div>
            <header>
                <span>{title}</span>
            </header>
        </div>
    )
}

export default header