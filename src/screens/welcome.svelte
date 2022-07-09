<script>
	import {fly} from 'svelte/transition';
</script>


<div class="hero min-h-screen" transition:fly="{{ y:200, duration: 110 }}">
	<div class="hero-content text-center">
		<div class="glassmorph-dark max-w-xl p-32">
			<h1 class="text-5xl font-bold">Welcome to RandomChoice</h1>
			<p class="py-6">Press <kbd class="font-bold not-italic capitalize">Get Started!</kbd> to start using the app</p>
			<button class="btn hover:btn-primary btn-outline rounded-xl border-2 capitalize text-lg" on:click>Get Started !</button>
		</div>
	</div>
</div>