<script lang="ts">
  import { onMount } from 'svelte';
  import {
    clearStorage,
    snapshotStorage,
    prettyJson,
    getTestData
  } from '../utils.ts';

  type Project = {
    token: string;
    from: string[];
    stream: object[];
  };

  let PROJECTS: null | Project[] = null;
  //   let mpTable;
  let filterTable;
  //   let profileActivity;

  const tableData = {
    rows: [
      {
        emoji: '😀',
        name: 'Grinning face',
        category: 'Smileys'
      },
      {
        emoji: '😀',
        name: ':smiley: in slack',
        category: 'Smileys'
      },
      {
        emoji: '😀',
        name: ':smiley: in slack',
        category: 'Slack'
      }
    ],
    columns: [
      {
        field: 'event',
        title: 'Name',
        flexBasis: '100px'
      },
      {
        field: 'name',
        title: 'Time',
        type: 'text-link',
        isSortable: true,
        isSearchable: true,
        flexGrow: '2'
      },
      {
        field: 'type',
        title: 'Category',
        isSortable: true,
        isSearchable: true,
        flexGrow: '1'
      }
    ],
    doingRangeSelect: false,
    draggingColumnIndex: null,
    draggingOverColumnIndex: null,
    dropPosition: null,
    focusedRowIdx: null,
    hasBodyScrolled: true,
    isDetailHovered: false,
    numRowsToDisplay: 75,
    sortField: null,
    sortOrder: 1,
    resizeColumnIndex: null
  };

  // Load data when the component is initialized
  async function loadData() {
    try {
      const storage = await snapshotStorage();
      //@ts-ignore
      PROJECTS = serialize(storage);
    } catch (e) {
      PROJECTS = getTestData();
    }
    return PROJECTS;
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
    const deduped: string[] = [];
    for (const item of arr) {
      if (!deduped.includes(item)) {
        deduped.push(item);
      }
    }
    return deduped;
  }

  function randomInt(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function objToString(obj) {
    const str = JSON.stringify(obj);
    return str.replace(/"/g, '&quot;');
  }

  const controlBar = {
    items: [
      { value: 'save', label: 'Save', icon: 'save' },
      { value: 'duplicate', label: 'Save new', icon: 'duplicate' },
      {
        value: 'open',
        label: 'Open',
        icon: 'open',
        tooltip: { text: 'Open Report' }
      }
    ]
  };

  onMount(() => {
    loadData().then(() => {
      const tabs = PROJECTS.map(a => {
        return {
          label: a.from.map(a => new URL(a).hostname).join(', '),
          value: a.token
        };
      });
	  const columns = [
        {
          field: 'event',
          title: 'Name',
          flexBasis: '100px',
          isSortable: true,
          isSearchable: true
        },
        {
          field: 'time',
          title: 'Time',
          type: 'text-link',
          isSortable: true,
          isSearchable: true,
          flexGrow: '2'
        },
        {
          field: 'type',
          title: 'Type',
          isSortable: false,
          isSearchable: false,
          flexGrow: '1'
        }
      ];
	  const rows = []
	  for (const project of PROJECTS) {
		  for (const entry of project.stream) {
			  rows.push({
				  event: entry.event,
				  name: entry?.properties?.time,
				  type: entry.endpoint,
				  key: project.token
			  })
		  }
	  }
      filterTable.tabs = tabs;
      filterTable.selectedTab = tabs[0].value;
      filterTable.columns = columns;
	  filterTable.rows = rows;

      debugger;
    });
    // const { rows, columns } = tableData;
    // mpTable.rows = rows;
    // mpTable.columns = columns;
    // debugger;
    // filterTable.update(tableProps);
    console.log('HAPPENED');
    //table props don't update
  });
</script>

<div id="main" class="container mx-auto px-4 h-full">
  <h1 class="top-2 text-center">Mixpanel Debug</h1>
  <div id="controls" class="flex flex-row justify-around space-x-2 pt-2">
    <!-- TRASH -->
    <mp-button
      theme="primary"
      icon="trashcan"
      id="clear"
      class="opacity-50 hover:opacity-100 tooltip"
      data-tip="delete"
      role="button"
      tabindex="0">Clear</mp-button
    >

    <!-- TOASTS -->
    <mp-button
      theme="primary"
      icon="alert-active"
      id="alerts"
      class="opacity-50 hover:opacity-100 tooltip"
      data-tip="get toasts"
      role="button"
      tabindex="0">Show Alerts</mp-button
    >

    <mp-switch />
  </div>

  <!-- <div class="flex flex-row justify-around space-x-2 pt-2">
	<p>fuck</p>
    
	<mp-section header-title="Click to see what happens"><div class="mp-section-content"><div class="emoji">🙋 This content can be collapsed into the title above.</div></div></mp-section>
	
  </div> -->

  <!-- <mp-toggle selected="all" theme="tab-bar" style-override={".mp-toggle-option { margin-left: 15px; } .mp-toggle.theme-tabbar { border-bottom: none; }"} options={"[{&quot;value&quot;:&quot;mine&quot;,&quot;label&quot;:&quot;My Cars&quot;},{&quot;value&quot;:&quot;all&quot;,&quot;label&quot;:&quot;All Cars&quot;}]"}></mp-toggle>
	<mp-filter-bar actions="[]" filters={"[{&quot;name&quot;:&quot;make&quot;,&quot;searchable&quot;:true,&quot;customFilters&quot;:{},&quot;defaultFilterLabel&quot;:&quot;All Makes&quot;,&quot;sections&quot;:[{&quot;items&quot;:[{&quot;label&quot;:&quot;All Makes&quot;,&quot;isSelected&quot;:true},{&quot;label&quot;:&quot;Chrysler&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;Lamborghini&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;Nissan&quot;,&quot;isSelected&quot;:false}]}]},{&quot;name&quot;:&quot;year&quot;,&quot;searchable&quot;:true,&quot;sections&quot;:[{&quot;items&quot;:[{&quot;label&quot;:&quot;1993&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;2011&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;2020&quot;,&quot;isSelected&quot;:false}]}]},{&quot;name&quot;:&quot;months&quot;,&quot;searchable&quot;:true,&quot;multiple&quot;:true,&quot;sections&quot;:[{&quot;items&quot;:[{&quot;label&quot;:&quot;Jan&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;Feb&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;Mar&quot;,&quot;isSelected&quot;:false},{&quot;label&quot;:&quot;Apr&quot;,&quot;isSelected&quot;:false}]}]}]"} result-count="3 results" selected-count="0" search-placeholder="Search cars" search-text=""><div slot="filter-select-action"></div></mp-filter-bar>
	<mp-table default-sort-field="count"></mp-table> -->

  <div class="flex flex-row pt-2">
    <!-- <mp-table class="w-full" bind:this={mpTable} /> -->
    <!-- <profile-activity bind:this={profileActivity}></profile-activity> -->
    <mp-filter-bar-table bind:this={filterTable} class="w-full" />
  </div>

  <!-- FEED -->
  <!-- <div class="flex flex-row justify-around space-x-2">
	<mp-control-bar theme="tertiary" controls={objToString(controlBar)}></mp-control-bar>
    <mp-tracked-user-icon
      distinct-id={randomInt(1, 420).toString()}
      size="large"
      displayname="user"
    />
  </div> -->
</div>

<!-- <button
      on:click={() => {
        PROJECTS = null;
        clearStorage().finally(() => {});
      }}>clear</button> -->

<!-- <div class="raw">
    {#if PROJECTS}
      {#each PROJECTS as { token, from, stream }}
        <h2>{token}</h2>
        <p>from: {from.join(', ')}</p>
        <pre>{prettyJson(stream)}</pre>
      {/each}
    {/if}
  </div> -->

<style>
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
