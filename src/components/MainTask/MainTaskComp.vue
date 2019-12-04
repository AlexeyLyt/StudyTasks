<template>  
    <div class="weather">
        <h1>ПОГОДА</h1>
        <multiselect
        placeholder="Введите город"
        selectLabel="Нажмите Enter, чтобы выбрать"
        v-model="selected"
        @select="getGeoApi"
        @keyup="totalcharacter++"
        @search-change="charCount"
        :options="options">
        <!-- <template v-if="this.selected.length <= 100">Введите минимум три символа, либо попробуйте изменить запрос</template> -->
        
        </multiselect>
        <p style="color:white; margin-top: 100px;">Charakt {{ totalcharacter }} times.</p>
    </div>
</template>

<script>
/* eslint-disable no-console */
import Multiselect from 'vue-multiselect'
import config from '../../../config.js'
export default {
    name: 'weather',
    components: { Multiselect },
    data () {
        return {
        totalcharacter : 0,
        selected: null,
        options: ['Москва', '2', '3'],
        geo: {}
        }
    },
    methods: {
        getGeoApi() {
        this.$axios.get(`${config.geoApi}?apikey=${config.apiKeyGeo}&format=json&geocode=${this.selected}`)
        .then( response => {
                this.geo = response.data.response.GeoObjectCollection.featureMember;
                this.geo.forEach(obj => {
                    // console.log(obj)
                    console.log(obj.GeoObject.Point.pos);
                });
                
            })
        },
        charCount(query) {
            this.totalcharacter++
            console.log(query.length);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">

.weather {
    padding-top: 55px;
}

h1 {
    text-align: center;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
}

.multiselect {
    width: 90%;
    margin: auto;
}

</style>
