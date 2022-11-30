import Spinner from "../components/Spinner";
import Skeleton from "../components/Skeleton";
import ErrorMessage from "../components/ErrorMessage";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state');
    }
} 

export default setContent;