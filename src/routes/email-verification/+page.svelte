<script lang="ts">
  import { enhance } from "$app/forms";
  import { Alert, Button, Card } from "flowbite-svelte";
  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<div class="flex justify-center items-center h-screen">
  <Card>
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Email Verification
    </h5>
    <p class="mb-5 mt-4 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      Your email verification link was sent to your email. If you haven't got the link the resend a new link.
    </p>
    <form method="post" use:enhance>
      <Button type="submit" class="w-fit">Resend Email</Button>
    </form>
    {#if form?.success}
      <Alert color="green">
        <span class="font-medium">Done!</span>
        New verification link has been sent to your email. Please check you you inbox.
      </Alert>
    {/if}
  </Card>
</div>

<!-- 
<h1>Email verification</h1>
<p>Your email verification link was sent to your inbox (i.e. console).</p>
<h2>Resend verification link</h2>
<form method="post" use:enhance>
	<input type="submit" value="Resend" />
</form>
{#if form?.success}
	<p>Your verification link was resent</p>
{/if} -->
