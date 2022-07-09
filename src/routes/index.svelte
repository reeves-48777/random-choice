<script>
	import { onMount } from 'svelte'
	import { createScene } from '../components/scene.js'
	import PageContainer from '../components/page-container.svelte'
	import Welcome from '../screens/welcome.svelte'
	import Main from '../screens/main.svelte'

	let el;
	let appOpened = false;

	onMount(() => {
		createScene(el, window);
	});

	function handleClick() {
		appOpened = true;
	}
</script>

<div>
	<!-- <div id="cursor" class="rounded-full"></div> -->
	<canvas class="z-0 absolute" bind:this={el}></canvas>
	<PageContainer>
		{#if !appOpened}
			<Welcome on:click|once={handleClick}/>
		{/if}
		{#if appOpened}
			<Main/>
		{/if}
	</PageContainer>
</div>