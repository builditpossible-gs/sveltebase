<script lang="ts">
  import { Section, Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Label, Input } from "flowbite-svelte";
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
            <form class="flex flex-col space-y-6" method="post">
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
              <div class="flex items-start">
                <a
                  href="/"
                  class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >Forgot password?</a
                >
              </div>
              <Button type="submit" class="w-full1">Sign in</Button>
              <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a
                  href="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  ><p>Sign up</p></a
                >
              </p>
            </form>
          </div>
        </Register>
      </Section>
    </div>
  </div>
</section>
