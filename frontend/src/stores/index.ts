const modulePaths = import.meta.glob("./*.store.ts");

for (const path in modulePaths) {
    /* @vite-ignore */
    import(path);
}
