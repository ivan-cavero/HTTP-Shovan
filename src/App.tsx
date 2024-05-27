import { Window } from '@tauri-apps/api/window'
import { Store } from '@tauri-apps/plugin-store'

import ResizablePane from './components/ResizablePanel/ResizablePane'
import DirectoryPanel from './components/Directory/DirectoryPanel'
import WorkSpacePanel from './components/WorkSpace/WorkSpacePanel'

export default function App() {
	const isVertical = false
	const appWindow = new Window('main')
	const store = new Store('store.bin')

	return (
		<div className={`w-screen h-screen flex ${isVertical ? 'flex-col' : 'flex-row'}`}>
			<ResizablePane minSize={150} initialSize={200} maxSize={300} isVertical={isVertical}>
				<DirectoryPanel store={store} />
			</ResizablePane>
			<ResizablePane minSize={150} initialSize={300} grow={true} isVertical={isVertical} bgColor={'bg-[#282828]'}>
				<WorkSpacePanel appWindow={appWindow} />
			</ResizablePane>
		</div>
	)
}
