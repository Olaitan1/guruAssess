const Error = () => {
    return (
        <section className="flex items-center justify-center w-full min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl text-red font-bold">Failed to load</h1>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="p-2 border border-lightGrey bg-white rounded-lg hover:scale-110 duration-300 ease-linear max-w-[8rem] w-full min-h-[3rem] text-base text-deepGrey font-medium"
                >
                    Reload Page
                </button>
            </div>
        </section>
    );
};

export default Error;
