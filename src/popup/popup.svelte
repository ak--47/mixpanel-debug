<script lang="ts">
  import { clearStorage, snapshotStorage, prettyJson } from '../utils.js';
	type Project = {
		token: string;
		from: string[];
		stream: object[];
	}

  let PROJECTS: null | Project[] = null;

  // Load data when the component is initialized
  async function loadData() {
    const storage = await snapshotStorage();
    PROJECTS = serialize(storage);
  }

  function serialize(storage: { [x: string]: any[] }) {
    const serialized = [];
    const keys = Object.keys(storage).filter(k => k.length === 32); //only tokens 
    for (const token of keys) {
      serialized.push({
        token,
        from: dedupe(storage[token].map(e => e.initiator)),
        stream: storage[token].map(e => e.data)
      });
    }

    return serialized;
  }

  function dedupe(arr: string[]) {
    const deduped : string[] = [];
    for (const item of arr) {
      if (!deduped.includes(item)) {
        deduped.push(item);
      }
    }
    return deduped;
  }

  loadData().then(() => {
    console.log('loaded local storage snapshot');
  });
</script>

<link rel="stylesheet" href="../../public/bundle.min.css" />
<div id="main">
  <h1>Mixpanel Debug</h1>

  <div id="controls">
    <svg-icon icon="trashcan"
      ><svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.85 3.5a.835.835 0 00-.85.86v.157h3.3V4.36a.834.834 0 00-.85-.861h-1.6V3.5zm3.95 1.017V4.36A2.335 2.335 0 0011.45 2h-1.6A2.335 2.335 0 007.5 4.36v.157H5.25C4.031 4.517 3 5.562 3 6.777v.201c0 .622.21 1.2.63 1.623.27.272.603.457.97.554v7.186c0 1.178.896 2.159 2.05 2.159h8.1c1.155 0 2.05-.981 2.05-2.16V9.172a2.216 2.216 0 001.7-2.194v-.2c0-1.216-1.031-2.26-2.25-2.26H13.8zm1.5 4.721H6.1v7.103c0 .432.305.659.55.659h8.1c.245 0 .55-.227.55-.66V9.238zM4.5 6.778c0-.397.369-.76.75-.76h11c.381 0 .75.363.75.76v.2c0 .464-.336.76-.75.76h-11c-.278 0-.452-.09-.555-.194-.104-.104-.195-.282-.195-.566v-.2zm4.25 3.477a.75.75 0 01.75.75v3.725a.75.75 0 11-1.5 0v-3.725a.75.75 0 01.75-.75zm4.75.75a.75.75 0 00-1.5 0v3.725a.75.75 0 101.5 0v-3.725z"
          fill="currentColor"
        /></svg
      >
    </svg-icon>
    <svg-icon icon="alert-active"
      ><svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        ><path
          d="M12.75 16.85a1.67 1.67 0 0 1-1.68 1.67 1.67 1.67 0 0 1-1.67-1.67m2.51-4.6H5.25m11.28-5.04a5.86 5.86 0 0 0-5.46-3.73 5.85 5.85 0 0 0-5.85 5.85v1.89a3.3 3.3 0 0 1-.56 1.85l-1.09 1.65a.84.84 0 0 0 .7 1.3h10.09"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        /><path
          d="M14.5 11.48l1.93 1.9 4.07-4"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        /></svg
      >
    </svg-icon>
    <button
      on:click={() => {
        PROJECTS = null;
        clearStorage().finally(() => {});
      }}>clear</button
    >
  </div>

  <div class="raw">
    {#if PROJECTS}
      {#each PROJECTS as { token, from, stream }}
        <h2>{token}</h2>
        <p>from: {from.join(', ')}</p>
        <pre>{prettyJson(stream)}</pre>
      {/each}
    {/if}
  </div>
</div>

<style>
  div#main {
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .raw {
    font-size: 0.8em;
    overflow: scroll;
    max-height: 500px;
    max-width: 500px;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: monospace;
  }

  h1 {
    font-size: 1.5em;
  }
</style>
