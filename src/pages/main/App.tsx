import ResizablePane from '../../components/ResizablePanel/ResizablePane'
import DirectoryPanel from '../../components/Directory/DirectoryPanel'
import { Minus, Copy, X } from 'lucide-react'
import { Window } from '@tauri-apps/api/window'

export default function App() {
	const isVertical = false
	const appWindow = new Window('main')

	return (
		<div className={`w-screen h-screen flex ${isVertical ? 'flex-col' : 'flex-row'}`}>
			<ResizablePane minSize={150} initialSize={200} maxSize={300} isVertical={isVertical}>
				<DirectoryPanel />
			</ResizablePane>
			<ResizablePane minSize={150} initialSize={300} grow={true} isVertical={isVertical} bgColor={'bg-[#282828]'}>
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
			</ResizablePane>
		</div>
	)
}
