export default function ProfileDropdown() {
    return (
        <main className="absolute right-0 top-11 z-50 divide-y-[1px] rounded-lg bg-white text-sm shadow">
            <section className="p-4">
                <p className="my-1 px-2">Sridhar</p>
                <p className="px-2 text-xs">sridharKeerthiga99@gmail.com</p>
            </section>
            <section className="p-4">
                <p className="cursor-pointer rounded p-2 hover:bg-slate-200">Your Profile</p>
                <p className="cursor-pointer rounded p-2 hover:bg-slate-200">Sign Out</p>
            </section>
        </main>
    );
}
