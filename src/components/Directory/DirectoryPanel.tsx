import { DropdownMenu } from "../Reusable/DropdownMenu";

export default function DirectoryPanel() {
    return (
        <div className="flex flex-col h-full">
            <header className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
                <h1 className="text-2xl font-bold">Add</h1>
                <DropdownMenu />
            </header>
            <main className="flex-grow overflow-auto">
            </main>
            <footer className="border-t border-gray-300 px-4 py-2">
                <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                />
            </footer>
        </div>
    );
}
