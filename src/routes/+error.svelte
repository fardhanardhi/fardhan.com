<script>
  import { page } from '$app/state';
</script>

<div class=" flex min-h-100 flex-col items-center justify-center px-4">
  <div class="text-error mb-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  </div>

  <h1 class="text-base-content mb-2 text-5xl font-bold">{page.status}</h1>
  <p class="text-base-content/70 mb-8 text-xl">{page.error?.message}</p>

  <a href="/" class="btn btn-outline"> Go back home </a>
</div>
