export default function AnalysticsDiv({ totalRegisteredPlayers, totalTeams, totalTeamPlayers }) {
    return (
        <div className="flex items-center">
            <div className="custom-shape flex items-center gap-2 bg-[#d4dced] px-10 py-2 text-[0.6rem]">
                <h1 className="text-2xl font-bold">{totalRegisteredPlayers}</h1>
                <section>
                    <p className="relative top-0.5">Total</p>
                    <p>Players</p>
                </section>
            </div>
            <div className="flex items-center gap-2 px-10 text-[0.6rem]">
                <h1 className="text-2xl font-bold">{totalTeams}</h1>
                <section>
                    <p className="relative top-0.5">Total</p>
                    <p>Teams</p>
                </section>
            </div>
            <div className="flex items-center gap-2 px-10 text-[0.6rem]">
                <h1 className="text-2xl font-bold">{totalTeamPlayers}</h1>
                <section>
                    <p className="relative top-0.5">Players</p>
                    <p>Assigned to team</p>
                </section>
            </div>
        </div>
    );
}
