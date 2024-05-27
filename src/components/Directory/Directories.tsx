import type { Store } from '@tauri-apps/plugin-store'
import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface DirectoriesProps {
	store: Store
}

interface Directory {
	type: string
	name: string
	id: string
}

interface DataItem {
	directories: Directory[]
}

function Directories({ store }: DirectoriesProps) {
	const [directories, setDirectories] = useState<Directory[]>([])
	const [selectedIndex, setSelectedIndex] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const data = (await store.values()) as DataItem[]
			if (data.length > 0) {
				const { directories } = data[0]
				const directoriesWithId = directories.map((directory) => ({
					...directory,
					id: directory.id || Math.random().toString(36).substr(2, 9)
				}))
				console.log(directoriesWithId)
				setDirectories(directoriesWithId)
				await store.set('directories', { directories: directoriesWithId })
			}
		}
		fetchData()
	}, [store])

	return (
		<div className='py-2'>
			{directories.map((directory) => (
				<button
					type='button'
					key={directory.id}
					className={`flex items-center justify-between w-full p-2 mb-2 border-l-4 ${
						selectedIndex === directory.id ? 'border-blue-500' : 'border-transparent'
					} hover:bg-[#6b6b6b70] cursor-pointer focus:outline-none`}
					onClick={() => setSelectedIndex(directory.id)}
				>
					<div className='flex items-center space-x-2'>
						<span className='text-xs font-semibold px-2 py-0.5 rounded bg-purple-600 text-white'>{directory.type.toUpperCase()}</span>
						<span className='text-white'>{directory.name}</span>
					</div>
					<div className='flex items-center space-x-2'>
						<button
							type='button'
							className='text-white hover:text-gray-600 focus:outline-none'
							onClick={(e) => {
								e.stopPropagation()
							}}
						>
							<ChevronRight size={16} />
						</button>
					</div>
				</button>
			))}
		</div>
	)
}

export default Directories
