<script>
	import {fly} from 'svelte/transition';
	import Card from '../components/card.svelte';
	import * as Picker from '../utils/picker.js';

	const typesPicker = ["CLASSIC", "LAST", "AVERAGE", "STONKS"];
	let type = typesPicker[0];
	let typeindex = 0;

	let firstTime = true;

	let out = "";

	let choices = [];
	let currentText = "";

	let nPicks = "";

	function addChoice(text) {
		if (text !== "" && text !== undefined) {
			choices = [...choices, text];
			currentText = "";

			document.querySelector('#addentry').focus();
		}	
	}

	function handleKeyPress(e) {
		if (e.key === "Enter") {
			setTimeout(() => {
				addChoice(currentText.trim())
				currentText = "";
			}, 1);
		}
	}

	function removeItem(index) {
		let tmpChoices = Array.from(choices);
		let removed = tmpChoices.splice(index,1);
		choices = tmpChoices;
		return removed;
	}


	function choose() {
		out = new Picker.Classic().pick(choices, removeItem);
		firstTime = false;
	}

	function raz() {
		choices = [];
		out = "";
		currentText = "";

		document.querySelector("#addentry").focus();

		firstTime = false;
	}
</script>

<div class="flex flex-col justify-evenly items-stretch gap-y-24 w-screen h-2/5" transition:fly="{{y: 150, duration: 400}}">

	<div class="flex items-center justify-center gap-x-24">

		<Card style="flex-none h-max" title="Add" buttonTitle="Add!" btnCallback={() => addChoice(currentText)} disabled={currentText.length < 1	}>
			<p slot="description">Type one of the answers in the following text field, and then add it !</p>
			<div class="flex flex-col items-center h-full ">
				<textarea id="addentry" class="textarea text-lg w-full h-full rounded-lg" placeholder="Choice 1 ..." bind:value={currentText} on:keydown={handleKeyPress} on:focus={out = ""}></textarea>
			</div>
		</Card>

		<Card style="flex-none h-max" title="Picker" hideButton>
			<p slot="description">Choose how to pick an answer</p>
			<div class="flex flex-col mx-auto gap-y-6">
				<div>
					<select class="select select-md text-lg rounded-t-lg rounded-b" bind:value={type} on:mousewheel={ e => { 
						if (e.deltaY < 0) {
							typeindex = typeindex-1;
							type = typesPicker[Math.abs(typeindex) % (typesPicker.length)];

							
						} 
						else if (e.deltaY > 0) {
							typeindex = typeindex+1;
							type = typesPicker[Math.abs(typeindex) % (typesPicker.length)];

						}
					}}>
						<option value={typesPicker[0]} selected>Classic</option>
						<option value={typesPicker[1]}>Last pick</option>
						<option value={typesPicker[2]}>Average pick</option>
						<option value={typesPicker[3]}>Stonks pick</option>
					</select>
				</div>
				<!-- {#if type !== "CLASSIC"} -->
				<div class="smooth" transition:fly="{{y:50, duration: 150}}" style="opacity: {type === "CLASSIC" ? "0" : "1" };">
					<input type="text" class="input text-lg rounded-lg w-3/5 text-center {type === "CLASSIC" ? "no-cursor" : ""}" bind:value={nPicks} disabled={type === "CLASSIC"} placeholder="Picks number"/>
				</div>
				<!-- {/if} -->
			</div>
		</Card>

		<Card style="h-full max-h-full flex-grow" title="Choices" disabled={choices.length < 1} btnCallback={() => choose()}>
			<p slot="description">Choose between them!</p>
			<div class="flex flex-col items-center mx-auto">
				{#if choices.length > 0}
				<ul class="px-4 list-none flex flex-col w-full gap-y-6">
					{#each choices as choice, i}
						<li class="rounded-lg overflow-hidden w-full">
							<label class="input-group">
								<input type="text" class="input text-lg w-full cursor-none" disabled bind:value={choice}/>
								<button class="btn hover:btn-primary border-none btn-square btn-outline rounded-r-lg" on:click={() => removeItem(i)}>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
								</button>
							</label>
						</li>
					{/each}
				</ul>
				{:else if firstTime}
				<input type="text" disabled class="input input-disabled text-lg w-full rounded-lg text-center" value="No answers to choose... Start adding new ones :)"/>
 				{/if}

			</div>
			<div slot="buttonList" class="card-actions gap-x-6">
				<button class="btn btn-outline rounded-2xl border-2 capitalize" on:click={choose} disabled={choices.length < 1}>Bake!</button>
				<button class="btn btn-outline rounded-2xl border-2 capitalize" on:click={raz}>Clear</button>
			</div>
		</Card>
	</div>

	{#if out !== undefined && out.length > 0}
	<p class="glassmorph-dark p-16 text-4xl text-center whitespace-pre-line break-all" transition:fly="{{y: 250, duration: 120 }}">
		{out}
	</p>
	{/if}

</div>