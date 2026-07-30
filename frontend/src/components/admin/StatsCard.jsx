const StatsCard = ({ title, value }) => {
    return (

        <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-200">

            <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                {title}
            </h2>

            <p className="text-4xl font-bold text-indigo-600 mt-3">
                {value}
            </p>

        </div>

    );
};

export default StatsCard;