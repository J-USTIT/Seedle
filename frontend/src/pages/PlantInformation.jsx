import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";

import Loading from "../components/Loading";

function PlantData({ plant }) {
    const { common_name } = plant;

    return (
        <>
            <h1>
                { common_name }
            </h1>
            <div>
                <img src={ plant.image_url } style={ {aspectRatio: "1/1"} } />
                { JSON.stringify(plant) }
                {/* ADD AND DESIGN THE PLANT INFORMATION NECESSARY */}
            </div>
        </>
    );
}

function PlantInformation() {
    const { id } = useParams();
    const [ plant ] = useFetch(`http://localhost:8000/api/plant/${id}`);
    
    const isLoading = plant?.data ? false : true;

    return (
        <>
            {/* ADD THE ACTUAL PAGE DESIGN IF LOAD IS FALSE AND SPINNER/LOADING IF TRUE */}
            { isLoading ? <Loading /> : <PlantData plant={plant.data} />}
        </>
    )
}

export default PlantInformation
