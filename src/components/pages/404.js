import ErrorMessage from "../ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <>
            <ErrorMessage/>
            <p> Page does not exist</p>
            <Link to="/">Back to main page</Link>
        </>
    )
}
export default Page404