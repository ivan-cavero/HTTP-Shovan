import { Minus, Copy, X } from 'lucide-react'
import type { Window } from '@tauri-apps/api/window'

export default function WorkSpacePanel({ appWindow }: { appWindow: Window }) {
	return (
		<div className='flex flex-col h-full'>
			<header className='flex justify-end items-center px-2 border-b border-gray-300 h-8' data-tauri-drag-region>
				<button type='button' onClick={() => appWindow.minimize()}>
					<Minus size={16} color='white' className='mx-2' />
				</button>
				<button type='button' onClick={() => appWindow.toggleMaximize()}>
					<Copy size={13} color='white' className='mx-2' />
				</button>
				<button type='button' onClick={() => appWindow.close()}>
					<X size={13} color='white' className='mx-2' />
				</button>
			</header>
			<main className='flex-grow overflow-auto' />
		</div>
	)
}
