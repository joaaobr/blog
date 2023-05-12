module.exports = {
    name: "blog",
    script: './api/index.js',
    max_memory_restart: '1G',
    exec_mode: "cluster",
    instances : "max",
    env: {
        NODE_ENV: "production"
    }
}