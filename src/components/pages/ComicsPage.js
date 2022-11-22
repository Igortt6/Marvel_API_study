import ComicsList from "../ComicsList";
import AppBanner from '../AppBanner';
import { Helmet } from "react-helmet";


const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our  comics"
                    />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}
export default ComicsPage