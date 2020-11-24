<template>
    <div class="mainInput">
        <div class="search">
            <input @keyup.down="next()" @keyup.up="prev()" @keyup="getCity()" @keyup.enter="choose(lineId)" 
            type="search" v-model="place" placeholder="Введите город"
            :class="{border_up: foundPlaces.length > 0 || !display}">
            <div :class="{up}" class="arrow"></div>
        </div>
        <div class="lst">
            <p class="border_down" :class="{display}">Введите минимум три символа, либо попробуйте изменить запрос</p>
            <p v-for="(place, index) in foundPlaces" :key="index" @click="choose(index)"
            :class="{current : index === this.lineId,
            border_down: index === this.foundPlaces.length - 1}">
                {{place}}
                <span :class="{display: index !== this.lineId}">Нажмите Enter для выбора</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            place: '',
            up: false,
            display: true,
            places: [],
            foundPlaces: [],
            coordinates: [],
            length: 0,
            lineId: -1
        }
    },
    // watch: {
    //     $route() {
    //         if (this.$route.query.lat != this.lat && this.$route.query.lon != this.lon && this.$route.query.lat && this.$route.query.lon) {
    //             this.find([this.$route.query.lat, this.$route.query.lon])
    //             console.log("hello")
    //         }
    //     }
    // },
    methods: {
        prev() {
            if (this.lineId > 0) this.lineId--
            else this.lineId = this.foundPlaces.length - 1
        },
        next() {
            this.lineId++
            if (this.lineId === this.foundPlaces.length) this.lineId = 0
        },
        choose(id){
            this.up = false
            this.place = this.foundPlaces[id]
            let lat= this.coordinates[id][1],
                lon = this.coordinates[id][0]
            this.clear()
            this.$router.push({name:'Home', query: {lat, lon, page: 0}})
            this.$emit("city",[lat, lon])
        },
        getCity() {
            if ((this.place.length >= 1 && !this.up) || (this.up && this.place.length === 0)) this.up = !this.up
            if (this.place.length >= 1 && this.place.length < 3)  this.display = false 
            else this.display = true
            if (this.place.length != this.length) {
                if (this.place.length >= 3) this.find(this.place)
                else this.clear()
                this.lineId = -1
            }
            this.length = this.place.length
        },
        find(info) {
            this.clear()
            let flag = true
            this.axios
            .get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=ba2ffe99-a90a-4c7e-893a-d14cbc5b3dc7&geocode=${info}`)
            .then(response => (this.places = response.data.response.GeoObjectCollection.featureMember.forEach(element => 
            {   
                if (info instanceof Array) {
                    if (flag) {
                        this.place = `${element.GeoObject.name}, ${element.GeoObject.description}`
                        flag = false
                    }
                } else {
                    this.foundPlaces.push(`${element.GeoObject.name}, ${element.GeoObject.description}`)
                    this.coordinates.push(element.GeoObject.Point.pos.split(' '))
                }
            })))
        },
        clear(){
            this.foundPlaces.length = 0
            this.coordinates.length = 0
        }
    },
    created() {
        if (this.$route.query.lat && this.$route.query.lon) this.find([this.$route.query.lon, this.$route.query.lat])
    }
}
</script>

<style lang="scss">
    .router-link {
        color: #000000;
        text-decoration: none;
    }
    input {
        border: 0px;
        padding: 20px 15px;
        height: 10px;
        width: 100%;
        position: relative;
        outline: none;
        border-radius: 6px;
        font-size: 16px;
    }
    .search {
        display: flex;
        flex-direction: row;
    }
    .arrow {
        position: relative;
        right: 15px;
        top: 16px;
        transform: rotate(90deg);
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #cdcdcd;
    }
    .up {
        transform: rotate(-90deg);
    }
    .lst {
        width: 99.55%;
    }
    p {
        margin: 0;
        background: #ffffff;
        padding: 15px;
        cursor: pointer;
    }
    .display {
        display: none;
    }
    span {
        float:right;
        font-size: 14px;
    }
    .current, p:hover{
        background: rgb(32, 172, 90);
        color: #ffffff;
    }
    h1 {
        color: #ffffff;
        text-align: center;
        font-weight: 1;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 55px;
    }
    .border_up {
        border-radius: 6px 6px 0 0;
    }
    .border_down {
        border-radius: 0 0 6px 6px;
    }
</style>