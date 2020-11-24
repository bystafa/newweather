<template>
    <div>
        <h1>Погода</h1>
        <InputLine @city="getInfo"/>
        <Carousel v-if="dataCarousel.length > 0" :dataCarousel="dataCarousel"/>
    </div>
</template>

<script>
import InputLine from "@/components/Input.vue"
import Carousel from "@/components/Carousel.vue"
export default {
    components: {
        InputLine, Carousel
    },
    data() {
        return {
            dataCarousel: [],
            lat: 0,
            lon: 0
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (Object.keys(vm.$route.query).length > 0) {
                vm.getInfo([vm.$route.query.lat, vm.$route.query.lon])}
        })
    },
    // watch: {
    //     $route() {
    //         if (this.$route.query.lat != this.lat && this.$route.query.lon != this.lon && this.$route.query.lat && this.$route.query.lon) {
    //             this.lat = this.$route.query.lat
    //             this.lon = this.$route.query.lon
    //             this.getInfo()
    //         }
    //     }
    // }, 
    methods: {
        getInfo(arr) {
            this.dataCarousel.length = 0
            this.axios
            .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${arr[0]}&lon=${arr[1]}&units=metric&exclude=current,minutely,hourly,alerts&appid=bf9bdc2f20c8f72608b22c412062526f`)
            .then(response => (response.data.daily.forEach(element => this.dataCarousel.push(element))))
        }
    }
}
</script>

<style lang="scss">
h1, h2, h3, h4, h5, h6, p, span, input {
    font-family: 'Roboto', serif;
}
body {
        padding: 200px 400px;
    }
h1 {
    font-weight: 1;
    text-align: center;
    color: #ffffff;
}

h4 {
    color: #ffffff;
}
@media screen and (max-width: 1670px){
    body {
        padding: 200px 300px;
    }
}
@media screen and (max-width: 1480px){
    body {
        padding: 200px;
    }
}
@media screen and (max-width: 1350px){
    body {
        padding: 200px 150px;
    }
}
</style>