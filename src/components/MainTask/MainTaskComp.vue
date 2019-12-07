<template>  
    <div class="weather">
        <h1>ПОГОДА</h1>
        <multiselect
        placeholder="Введите город"
        selectLabel="Нажмите Enter, чтобы выбрать"
        v-model="selected"
        @select="getWeatherApi"
        @keyup="totalcharacter++"
        @search-change="getGeoApi"
        :options="options"
        label="name"
        track-by="name">
        <template slot="noResult">
            <span>Введите минимум три символа, либо попробуйте изменить запрос</span>
        </template>
        <template slot="noOptions">
            <span>Введите минимум три символа, либо попробуйте изменить запрос</span>
        </template>
        </multiselect>

        <h1 class="day">День недели</h1>
        <carousel :navigationEnabled="true" :perPage='8'>

            <slide  v-for="weather in weatherData" :key="weather.id">
                <div class="example-slide">
                    <div>Время</div>
                    <div>  </div>
                </div>
            </slide>

            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>
            <slide><div class="example-slide">Slide </div></slide>

         </carousel>

        <!-- <pre class="language-json"><code>{{  value  }}</code></pre> -->

    </div>
</template>

<script>
/* eslint-disable no-console */
import { Carousel, Slide } from 'vue-carousel'
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import config from '../../../config.js'
// import Carousel from '@/components/MainTask/Carousel.vue'
export default {
    name: 'weather',
    components: { Multiselect, Carousel, Slide },
    data () {
        return {
            totalcharacter : 0,
            selected: "",
            options: [],
            geo: {},
            weather: {},
            dateTime: {},
            coord: [],
            temp: [],
            time: [],
            weatherData: [],
            itemPerPage: 0
        }
    },
    methods: {
        getGeoApi(currentValue) {
        this.temp = [];
        this.time = [];
        if(currentValue.length <= 2) {
            this.options = [];
            this.temp = [];
        }else{
            // console.log(selectedOption)
            this.$axios.get(`${config.geoApi}?apikey=${config.apiKeyGeo}&format=json&geocode=${currentValue}`)
            .then( response => {
            // console.log(`${config.geoApi}?apikey=${config.apiKeyGeo}&format=json&geocode=${currentValue}`);

            this.geo = response.data.response.GeoObjectCollection.featureMember;
                
            this.geo.forEach(obj => {

                this.options.push(obj.GeoObject); // вытаскиваю все объекты с массива apі
                this.coord.push(obj.GeoObject.Point.pos); // вытаскиваю координаты
                    
            });
                
            })
        }
        
        },
        getWeatherApi(currentValue) {

            var lat = 0;
            var lon = 0;
            var coord = currentValue.Point.pos.split(" ");
            lon = coord[0];
            lat = coord[1];
        
            // console.log(lat);
            
            this.$axios.get(`${config.weatherApi}lat=${lat}&lon=${lon}&appid=${config.apiKeyWeather}`)
            .then( response => {
            // console.log(`${config.weatherApi}lat=${lat}&lon=${lon}&appid=${config.apiKeyWeather}`);

            this.weather = response.data.list;

            this.weather.forEach(obj => {

                this.temp.push(obj.main.temp); // температура в Кельвинах за 5 дней (каждые 3 часа)
                this.time.push(obj.dt_txt); // дата и время (5 дней каждые 3 часа - 40 элементов по 8 элементов на целый день)
                    
            });

            // console.log(this.temp);
            // console.log(this.time);
            // console.log(response.data.list[0].dt);

            let sliceIndex = 0;
            let sliceEnd;
            if (response.data.list && response.data.list.length) {
                this.errorWeatherData = false;
                this.weatherData = [];
                let currentDay = moment.unix(response.data.list[0].dt).utc().get('date'); // utc() - fix timezone
                // console.log(currentDay);
                
                response.data.list.forEach( (item, index) => {
                    let itemDay = moment.unix(item.dt).utc().get('date'); // utc() - fix timezone
                    // console.log(index);
                    sliceEnd = index;
                    if (itemDay != currentDay) {
                        this.weatherData.push(response.data.list.slice(sliceIndex, sliceEnd));
                        currentDay = itemDay;
                        sliceIndex = index;
                    }
                });
                this.weatherData.push(response.data.list.slice(sliceIndex));
            } else {
                
                this.errorWeatherData = true;
                this.weatherData = [];
            }

            console.log(this.weatherData);
            
            })
        }
    },
    computed: {
    
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import "~vue-multiselect/dist/vue-multiselect.min.css";

.weather {
    // padding-top: 55px;
}

h1 {
    text-align: center;
    color: white !important;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
}

.multiselect {
    width: 90%;
    margin: auto;
}

.example-slide {
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
  }

  .carousel {
    color: white;
}

.day {
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    margin-top: 15px !important;
}

.VueCarousel-slide {
    text-align: center;
}

 .example-slide {
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
    flex-wrap: wrap;
  }

.example-slide div {
    width: 100%;
}

.VueCarousel-navigation-prev,
.VueCarousel-navigation-next {
    transition: all 0.2s;
}
.VueCarousel {
    &:hover {
        .VueCarousel-navigation-prev {
            transform: translateY(-50%) translateX(60%);
            transition: all 0.2s;
        }
        .VueCarousel-navigation-next {
            transform: translateY(-50%) translateX(-75%);
            transition: all 0.2s;
        }
    }
}

.VueCarousel-navigation-button {
    top: 35% !important;
}

</style>
