<script lang="ts">
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { GridSolid } from 'flowbite-svelte-icons';
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
</script>

<Sidebar style="height: 94.3vh" asideClass="float-left">
	<SidebarWrapper
		style="height: 100%"
		divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800 float-left"
	>
		<SidebarGroup>
			<SidebarDropdownWrapper label="Styl profilu">
				<svelte:fragment slot="icon">
					<GridSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<SidebarDropdownItem label="Styl 1" />
				<SidebarDropdownItem label="Styl 2" />
				<SidebarDropdownItem label="Styl 3" />
			</SidebarDropdownWrapper>
			<SidebarItem label="Ramka" {spanClass}>
				<svelte:fragment slot="icon">
					<GridSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<svelte:fragment slot="subtext">
					<span
						class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
					>
						Beta
					</span>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
