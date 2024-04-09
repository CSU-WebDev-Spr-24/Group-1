import loadingGif from '../images/loading.gif';

const Loading = () => (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
            <img className="ease-linear mb-4 h-full w-full" src={loadingGif} alt="Loading..."/>
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
    )
;

export default Loading;
