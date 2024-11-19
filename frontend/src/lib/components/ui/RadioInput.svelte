<script lang="ts">
  import { CreateDatasetOperationType, DatasetOperationType } from '$interfaces/operationType.enum';

  export let value: string = '';
  export let operation: DatasetOperationType | CreateDatasetOperationType | null = null;
  export let name: string = '';
  export let onChange;
</script>

<label class="cursor-pointer text-nowrap">
  <input type="radio" {name} {value} bind:group={operation} on:change={onChange} />
  {value}
</label>
