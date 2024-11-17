<script lang="ts" context="module">
	export const footerLinks = [
		{ name: 'Give Us Feedback', path: '#' },
		{ name: 'Contact Us', path: '#' },
	];
</script>

<script lang="ts">
	// import { routes } from '$lib/routes';
	// import Logo from '$lib/components/svg/logo.svg?component';
	// import { Button } from './ui/button';
	// import Link from '$lib/components/ui/link/Link.svelte';
	// import { PUBLIC_APPLICATION_URL } from '$env/static/public';
	// import { Menu, X } from 'lucide-svelte';
	// import { cn } from '$lib/utils/cn';
	// import { slide } from 'svelte/transition';

	// export let menuOpen: boolean;
	// import { scrollToElement } from '$lib/utils/scrollToElement';
    import Link from '$lib/components/ui/Link.svelte';
</script>


<footer class="flex items-center justify-center shadow-custom-box-shadow bg-custom-gradient h-24" >
    <ul class="max-w-screen-xl mx-auto flex gap-6">
        {#each footerLinks as link}
            <li>
                <Link href={link.path} >{link.name}</Link>
            </li>
        {/each}
    </ul>
</footer>