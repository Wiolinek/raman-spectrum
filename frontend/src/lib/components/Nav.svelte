<script lang="ts" context="module">
	export const navLinks = [
		{ name: 'Spectra', path: '/' },
		{ name: 'User guidance', path: '/guidance' },
	];
    export const accountLinks: { name: string; path: string; variant: 'default' | 'outlined' | 'fullfilled' }[] = [
        { name: 'Login', path: '#', variant: "fullfilled" },
        { name: 'Registration', path: '#', variant: "outlined" },
    ];
</script>

<script lang="ts">
	// import { routes } from '$lib/routes';
	// import Logo from '$lib/components/svg/logo.svg?component';
	// import { Button } from './ui/button';
	import Link from '$lib/components/ui/Link.svelte';
	// import { PUBLIC_APPLICATION_URL } from '$env/static/public';
	// import { Menu, X } from 'lucide-svelte';
	// import { cn } from '$lib/utils/cn';
	// import { slide } from 'svelte/transition';

	// export let menuOpen: boolean;
	// import { scrollToElement } from '$lib/utils/scrollToElement';
    import LogoImage from '$lib/images/logo-new.png';
</script>



<nav class="flex items-center sticky text-primary shadow-custom-box-shadow text-lg font-medium h-20 bg-custom-gradient" >
    <div class="flex w-full max-w-screen-xl mx-auto gap-14">
        <a href='/'>
            <img alt="" src={LogoImage} class="w-40"/>
        </a>
        <div class="w-full flex justify-between">
            <ul class="flex items-center gap-6">
                {#each navLinks as link}
                    <li>
                        <Link href={link.path} >{link.name}</Link>
                    </li>
                {/each}
            </ul>
            <ul class="flex items-center gap-6">
                {#each accountLinks as link}
                    <li>
                        <Link href={link.path} variant={link.variant}>{link.name}</Link>
                    </li>
                {/each}
            </ul>
        </div>
        
    </div>
</nav>
