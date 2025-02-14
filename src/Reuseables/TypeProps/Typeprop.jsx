import './TypeProp.css'
const TypeProp = (props) => {
    return ( <div className="typee">
            <p id='price'>{props.price}</p>
            
        <div className="access">
            <h4>{props.access}</h4>
            <p>{props.unit}</p>
        </div>

    </div> );
}
 
export default TypeProp;