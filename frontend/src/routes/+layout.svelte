<script lang="ts">
  import { Toaster } from 'svelte-sonner';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
</script>

<Toaster richColors closeButton visibleToasts={10} duration={8000}/>
<Nav />
<slot />
<Footer />