import { DropdownMenu } from '../Reusable/DropdownMenu'
import Directories from './Directories'
import { Search } from 'lucide-react'
import type { Store } from '@tauri-apps/plugin-store'

export default function DirectoryPanel({ store }: { store: Store }) {
	return (
		<div className='flex flex-col h-full'>
			<header className='flex justify-between items-center px-4 border-b border-gray-300 h-8' data-tauri-drag-region>
				<span className='text-1xl text-white'>Add</span>
				<DropdownMenu store={store} />
			</header>
			<main className='flex-grow overflow-auto'>
				<Directories store={store} />
			</main>
			<footer className='px-3 py-2'>
				<div className='relative'>
					<Search size={14} color='white' className='absolute left-2 top-1/2 transform -translate-y-1/2' />
					<input
						type='text'
						placeholder='Filter...'
						className='w-full pl-8 rounded-md focus:outline-none bg-white bg-opacity-10 text-gray-300 placeholder-gray-300 text-sm'
					/>
				</div>
			</footer>
		</div>
	)
}
