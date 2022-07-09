<script>
	export let style = "w-full";
	export let title = "Placeholder";
	export let buttonTitle = "Placeholder";
	export let hideButton = false;
	export let darkButton = false;
	export let btnCallback = () => {};
	export let disabled = false;
</script>


<div class="card {style} glassmorph-dark">
	<div class="card-body items-center text-center">
		<div class="flex justify-center w-full">
			<h1 class="card-title text-4xl">{title}</h1>
		</div>
		<slot name="description">
			<p>Description placeholder</p>
		</slot>
		<div class="w-full my-6">
			<slot>
			</slot>
		</div>
		<slot name="buttonList">
			{#if !hideButton}
			<div class="card-actions">
				<button class="btn {darkButton ? "hover:btn-primary" : ""} btn-outline rounded-2xl border-2 capitalize" on:click={btnCallback()} disabled={disabled}>{buttonTitle || "Placeholder"}</button>
			</div>
			{/if}
		</slot>
	</div>
</div>