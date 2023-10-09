<script lang="ts">
  import { Section, Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Label, Input, Alert } from "flowbite-svelte";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  
  export let form: ActionData;
</script>

<section class="relative h-screen pt-20 flex">
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
      class="max-w-md mx-auto py-6 lg:py-12 px-4 lg:px-8 bg-white rounded-xl "
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
            <form class="flex flex-col space-y-6" method="post" use:enhance>
              <Label class="space-y-2">
                <span>Your email</span>
                <Input
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                />
              </Label>
              <Label class="space-y-2">
                <span>Your email</span>
                <Input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                />
              </Label>
              <Label class="space-y-2">
                <span>Your password</span>
                <Input
                  type="password"
                  name="password"
                  placeholder="•••••"
                  required
                />
              </Label>
              {#if form?.message}
              <Alert>
                <span class="font-medium">Opps!</span>
                {#if form.message === "AUTH_INVALID_PASSWORD"}
                  <p>Invalid Password</p>
                  {:else}
                  {form.message}
                {/if}
              </Alert>
              {/if}
              <Button type="submit" class="w-full1">Sign up</Button>
              <p class="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                Already have an account yet? <a
                  href="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  ><p>Login here</p></a
                >
              </p>
            </form>
          </div>
        </Register>
      </Section>
    </div>
  </div>
</section>
