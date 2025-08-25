<script>
    import { enhance } from '$app/forms';
    import '../app.css';
    import snoopy_happy from '$lib/images/snoopy-happy.jpg';
    import snoopy_cool from '$lib/images/snoopy-cool.jpg';
    import snoopy_anger from '$lib/images/snoopy-anger.png';
    import snoopy_thinking from '$lib/images/snoopy-thinking.jpg';

    /** @type {import('./$types').ActionData} */
    export let form;

    let thinking = false;
    $: success = form?.success;
    $: incorrect = form?.incorrect;
    $: missing = form?.missing;

    // $: console.log(form, success, incorrect, missing, thinking);
    $: console.log(form);

    let preloadImageUrls = [snoopy_happy, snoopy_thinking, snoopy_anger, snoopy_cool];
</script>

{#each preloadImageUrls as image}
    <link rel="preload" as="image" href={image} />
{/each}

<div style="width: fit-content">
    <h2 class="article-title flex-center">Sleepy Vault</h2>
    <div
        class="card padding-large padding-bottom-none flex-center"
        style="display: inline-block; width: auto"
    >
        {#if thinking === true}
            <img src={snoopy_thinking} alt="Snoopy thinking" width="150" class="row no-border" />
            <div class="row flex-spaces">
                <div class="alert alert-warning background-warning text-warning border-warning"
                    >Checking credentials...</div
                >
            </div>
        {:else if success === true}
            <img src={snoopy_cool} alt="Snoopy cool" width="200" class="row no-border" />
            <div class="flex-spaces row">
                <div class="alert alert-success background-success text-success border-success"
                    >{form?.flag}</div
                >
            </div>
        {:else if incorrect === true}
            <img src={snoopy_anger} alt="Snoopy angry" width="150" class="row no-border" />
            <div class="row flex-spaces">
                <div class="alert alert-danger background-danger text-danger border-danger"
                    >Bad login</div
                >
            </div>
        {:else if missing === true}
            <img src={snoopy_anger} alt="Snoopy angry" width="200" class="row no-border" />
            <div class="row flex-spaces">
                <div class="alert alert-danger background-danger text-danger border-danger"
                    >Missing credential(s)</div
                >
            </div>
        {:else}
            <img src={snoopy_happy} alt="Snoopy happy" width="200" class="row no-border" />
        {/if}

        <form
            method="POST"
            use:enhance={() => {
                thinking = true;
                incorrect = false;
                missing = false;
                success = false;

                return async ({ update }) => {
                    await update();
                    thinking = false;
                };
            }}
        >
            <div class="form-group">
                <label for="username" class="card-text">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={form?.username ?? ''}
                    placeholder="Username"
                    class="row input-block"
                />
            </div>
            <div class="form-group">
                <label for="password" class="card-text">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={form?.password ?? ''}
                    placeholder="Password"
                    class="row input-block"
                />
            </div>
            <button class="background-secondary border-secondary text-secondary row btn-block"
                >Login</button
            >
        </form>
    </div>
</div>
