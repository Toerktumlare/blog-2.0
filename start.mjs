import * as esbuild from 'esbuild'
import fs from 'fs'

fs.copyFile('public/index.html', 'dist/index.html', (err) => {
    if (err) {
        console.log("Error Found:", err);
    }
})

let ctx = await esbuild.context({
    entryPoints: ['src/index.jsx'],
    outfile: 'dist/bundle.js',
    logLevel: "info",
    bundle: true,
    sourcemap: 'inline',
});

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: 'dist/',
})

