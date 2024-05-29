import {Link} from 'react-router-dom'


export default function Navigation(){
    return(
        <>
        <div className="chemins">
            <Link to="/Creerpersonnage"> Personnage </Link>
            <Link to="/Creermonstre"> Monstre </Link>
        </div>
        </>
    )
}