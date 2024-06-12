export default function AnalysticsDiv({ totalRegisteredPlayers, totalTeams, totalTeamPlayers }) {
    return (
        <div className="flex">
            <div className="flex items-center text-[0.6rem] gap-2 bg-[#d4dced] custom-shape px-10 py-2">
                <h1 className="font-bold text-2xl">{totalRegisteredPlayers}</h1>
                <section>
                    <p className="relative top-0.5">Total</p>
                    <p>Players</p>
                </section>
            </div>
            <div className="flex items-center text-[0.6rem] gap-2 px-10">
                <h1 className="font-bold text-2xl">{totalTeams}</h1>
                <section>
                    <p className="relative top-0.5">Total</p>
                    <p>Teams</p>
                </section>
            </div>
            <div className="flex items-center text-[0.6rem] gap-2 px-10">
                <h1 className="font-bold text-2xl">{totalTeamPlayers}</h1>
                <section>
                    <p className="relative top-0.5">Players</p>
                    <p>Assigned to team</p>
                </section>
            </div>
        </div>
    );
}
