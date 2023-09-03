import {defineConfig} from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), solidJs(), icon({iconDir: 'src/icons'})],
    output: 'server',
    adapter: cloudflare({mode: 'directory', functionPerRoute: true}),
    image: {
        service: {
            entrypoint: 'astro/assets/services/noop'
        }
    }

});