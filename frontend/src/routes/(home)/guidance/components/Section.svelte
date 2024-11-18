<script lang="ts">
  export let heading: string;
  export let content: string[];
</script>

<section class="mb-6">
  <h2 class="text-xl font-bold mb-2">{heading}</h2>
  <ul class="list-disc pl-6 space-y-2">
    {#each content as paragraph}
      <li>{@html paragraph}</li>
    {/each}
  </ul>
</section>
