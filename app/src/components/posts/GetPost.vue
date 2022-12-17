<template>
<body>
    <div>
        <h1>{{title}}</h1>

        <p>{{ post }}</p>
    </div>
</body>
</template>

<script>
export default {
    name: "GetPost",
    data() {
        return {
            title: null,
            post: null
        }
    }

}
</script>

