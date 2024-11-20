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
	import Link from '$lib/components/ui/Link.svelte';
    import LogoImage from '$lib/images/logo-new.png';
</script>



<nav class="flex items-center fixed w-full text-primary shadow-custom-box-shadow text-lg font-medium h-20 bg-custom-gradient z-10" >
    <div class="flex w-full max-w-screen-xl mx-auto gap-14 px-8">
        <a href='/'>
            <img alt="" src={LogoImage} class="w-40 -ml-2"/>
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
