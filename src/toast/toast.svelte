<script>
  import { onDestroy, onMount } from 'svelte';
  export let message = '' || 'EVENT!';
  export let duration = 3000;

  let visible = true;
  let timeout = setTimeout(() => {
    visible = false;
  }, duration);

  onMount(() => {
    console.log('MOUNT');
  });
  onDestroy(() => {
    console.log('DESTROY');
    clearTimeout(timeout);
  });
</script>

{#if visible}
  <div>
    {message} yo
  </div>
{/if}

<style>
  div {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    color: red;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 9999;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }
</style>
