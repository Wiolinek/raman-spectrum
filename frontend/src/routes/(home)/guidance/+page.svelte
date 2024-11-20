<script lang="ts">
  import Section from './components/Section.svelte';

  import guidanceData from './utils/guidance.json';

  let title: string = guidanceData.title;
  let sections = guidanceData.sections;
</script>

<main class="flex flex-col w-full max-w-screen-xl mx-auto pt-36 pb-16 gap-10 px-8">
  <h1 class="text-2xl font-extrabold mb-8">{title}</h1>

  {#each sections as section}
    <Section heading={section.heading} content={section.content} />
  {/each}
</main>
