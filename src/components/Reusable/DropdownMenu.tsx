import { useState, useEffect } from 'react'
import { useAnimate, stagger, motion } from 'framer-motion'
import type { Store } from '@tauri-apps/plugin-store'

import { FilePlus2, Folders, Plus, ChevronRightIcon } from 'lucide-react'

import { cn } from '../../utils/cn'

function useMenuAnimation(isOpen: boolean) {
	const [scope, animate] = useAnimate()

	const staggerMenuItems = stagger(0.1, { startDelay: 0.15 })

	useEffect(() => {
		animate('#menu-icon', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 })

		animate(
			'ul',
			{
				clipPath: isOpen ? 'inset(0% 0% 0% 0% round 12px)' : 'inset(10% 90% 90% 10% round 12px)'
			},
			{
				type: 'spring',
				bounce: 0,
				duration: 0.5
			}
		)

		animate('li', isOpen ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.3, filter: 'blur(20px)' }, {
			duration: 0.2,
			delay: isOpen ? staggerMenuItems : 0
		})
	}, [isOpen, animate, staggerMenuItems])

	return scope
}

type DropdownMenuProps = {
	containerClassName?: string
	itemClassName?: string
	store: Store
}

export function DropdownMenu({ containerClassName, itemClassName, store }: DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false)
	const scope = useMenuAnimation(isOpen)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (scope.current && !scope.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [scope.current])

	const items = [
		{
			icon: <Folders size={16} />,
			name: 'HTTP Request',
			customStyle: 'text-primary-100',
			type: 'http',
			defaultName: 'New Request',
			method: 'GET'
		},
		{
			icon: <FilePlus2 size={16} />,
			name: 'Event Stream Request',
			customStyle: 'text-secondary-100',
			type: 'event-stream',
			defaultName: 'Event Stream',
			method: 'GET'
		},
		{
			icon: <FilePlus2 size={16} />,
			name: 'Websocket Request',
			customStyle: 'text-secondary-100',
			type: 'websocket',
			defaultName: 'Websocket Request',
			method: 'GET'
		},
		{
			icon: <FilePlus2 size={16} />,
			name: 'GraphQL Request',
			customStyle: 'text-secondary-100',
			type: 'graphql',
			defaultName: 'GraphQL Request',
			method: 'POST'
		},
		{
			icon: <FilePlus2 size={16} />,
			name: 'gRPC Request',
			customStyle: 'text-secondary-100',
			type: 'grpc',
			defaultName: 'gRPC Request',
			method: 'POST'
		},
		{
			icon: <FilePlus2 size={16} />,
			name: 'From Curl',
			customStyle: 'text-secondary-100',
			type: 'curl',
			defaultName: 'Curl Request',
			method: 'GET'
		},
		{
			icon: <Folders size={16} />,
			name: 'New Folder',
			customStyle: 'text-primary-100',
			type: 'folder',
			defaultName: 'New Folder'
		}
	]

	return (
		<nav className={cn('space-y-2', containerClassName)} ref={scope}>
			<motion.button
				whileTap={{ scale: 0.97 }}
				className='bg-neutral-900 border border-neutral-800 flex items-center justify-between p-0.5 rounded-xl'
				onClick={() => setIsOpen((prevState) => !prevState)}
			>
				<div style={{ transformOrigin: '50% 55%' }}>
					<Plus size={12} className='text-neutral-400' id='menu-icon' />
				</div>
			</motion.button>
			<ul
				className={cn(
					'absolute z-[1] max-w-[200px] w-full space-y-3 p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl',
					isOpen ? 'pointer-events-auto' : 'pointer-events-none'
				)}
				style={{
					clipPath: 'inset(10% 50% 90% 50% round 12px)'
				}}
			>
				{items.map(({ icon, name, type, defaultName, customStyle }) => (
					<li key={name}>
						<button
							type='button'
							onClick={async () => {
								const directories = ((await store.get('directories')) as { directories: { type: string; name: string }[] }) || {
									directories: []
								}
								await store.set('directories', {
									directories: [
										...directories.directories,
										{ type, name: defaultName, id: Math.random().toString(36).substring(2, 11) }
									]
								})
								setIsOpen(false)
								await store.save()
							}}
							className={cn(
								'group flex items-center gap-2 rounded-md border border-transparent text-neutral-400 hover:text-neutral-300 focus-visible:text-neutral-300 focus-visible:border-neutral-800 focus-visible:outline-none',
								itemClassName,
								customStyle
							)}
						>
							<span>{icon}</span>
							<span className='flex items-center gap-1 text-sm'>
								{name}
								<ChevronRightIcon
									size={12}
									className='-translate-x-1 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all'
								/>
							</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	)
}
