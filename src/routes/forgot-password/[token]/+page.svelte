<script lang="ts">
  import { Section, Register } from "flowbite-svelte-blocks";
  import { Button, Label, Input, Alert } from "flowbite-svelte";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let data;
  export let form: ActionData;
</script>

<section class="relative h-screen pt-20 flex items-center">
  <img
    class="hidden lg:block absolute top-0 left-0 mt-16"
    src="https://shuffle.dev/zeus-assets/icons/dots/blue-dot-left-bars.svg"
    alt=""
  />
  <img
    class="hidden lg:block absolute bottom-0 right-0 mb-20"
    src="https://shuffle.dev/zeus-assets/icons/dots/yellow-dot-right-shield.svg"
    alt=""
  />
  <div class="container px-4 mx-auto">
    <div
      class="max-w-md mx-auto py-6 lg:py-12 px-4 lg:px-8 bg-white rounded-xl"
    >
      <Section name="login">
        <Register href="/">
          <svelte:fragment slot="top">
            <img
              class="w-8 h-8 mr-2"
              src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg"
              alt="logo"
            />
            Flowbite
          </svelte:fragment>
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            {#if data.isTokenValid}
              <form class="flex flex-col space-y-6" method="post" use:enhance>
                <Label class="space-y-2">
                  <span>New Password</span>
                  <Input
                    type="password"
                    name="password"
                    placeholder="•••••"
                    required
                  />
                </Label>
                <Button type="submit" class="w-full1">Reset password</Button>
              </form>
              {#if form?.message}
              <Alert>
                <span class="font-medium">Opps!</span>
                {form.message}
              </Alert>
              {/if}
            {:else if !data.isTokenValid}
              <h1>Invalid or expired password reset link</h1>
			  <Button type="submit" href="/forgot-password" class="w-full1">Resend Link</Button>
            {/if}
          </div>
        </Register>
      </Section>
    </div>
  </div>
</section>
