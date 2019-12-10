<template>  
    <div class="weather">
        <h1>ПОГОДА</h1>
        <multiselect
        placeholder="Введите город"
        selectLabel="Нажмите Enter, чтобы выбрать"
        v-model="selected"
        :value='selectedValue'
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

        <b-carousel v-if="weatherData.length"
        id="carousel-1"
        ref="myCarousel"
        v-model="slide"
        :interval="0"
        controls
        indicators
        @sliding-end="onSlideEnd">

        <b-carousel-slide v-for="weatherDay in weatherData" :key="weatherDay.id">
          <h1 class="day">{{ moment(weatherDay[0].dt_txt).format('dddd') }} <br> {{ moment(weatherDay[0].dt_txt).format('LL') }}</h1>
                <div class="example-slide">
                    <div v-for="weatherHour in weatherDay" :key="weatherHour.id" class="slide-item">
                        <div class="weather-time">{{ moment.unix(weatherHour.dt).utc().format('LT') }}</div>
                        <!-- <div class="weather-timezone-region"> {{ moment.unix(weatherHour.dt).utc().format('LT') }} </div> -->
                        <div v-if="weatherHour.weather[0].main === 'Atmosphere'" class="icon sun-shower">
                            <div class="cloud"></div>
                            <div class="sun">
                                <div class="rays"></div>
                            </div>
                            <div class="rain"></div>
                        </div>

                        <div v-if="weatherHour.weather[0].main === 'Thunderstorm'" class="icon thunder-storm">
                            <div class="cloud"></div>
                            <div class="lightning">
                                <div class="bolt"></div>
                                <div class="bolt"></div>
                            </div>
                        </div>

                        <div v-if="weatherHour.weather[0].main === 'Clouds'" class="icon cloudy">
                            <div class="cloud"></div>
                            <div class="cloud"></div>
                        </div>

                        <div v-if="weatherHour.weather[0].main === 'Snow'" class="icon flurries">
                            <div class="cloud"></div>
                            <div class="snow">
                                <div class="flake"></div>
                                <div class="flake"></div>
                            </div>
                        </div>

                        <div v-if="weatherHour.weather[0].main === 'Clear'" class="icon sunny">
                            <div class="sun">
                                <div class="rays"></div>
                            </div>
                        </div>

                        <div
                        v-if="weatherHour.weather[0].main === 'Drizzle' ||
                        weatherHour.weather[0].main === 'Rain'" class="icon rainy">
                            <div class="cloud"></div>
                            <div class="rain"></div>
                        </div>

                        <div class="weather-temp">{{ Math.round(weatherHour.main.temp) + ' °' + 'C' }}</div>
                    </div>
                </div>
      </b-carousel-slide>
    </b-carousel>

    </div>
</template>

<script>
/* eslint-disable no-console */
// import { Carousel, Slide } from 'vue-carousel'
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import config from '../../../config.js'
// import Carousel from '@/components/MainTask/Carousel.vue'
export default {
    name: 'weather',
    components: { Multiselect },
    data () {
        return {
            totalcharacter : 0,
            selected: {},
            options: [],
            geo: {},
            weather: {},
            dateTime: {},
            coord: [],
            temp: [],
            time: [],
            weatherData: [],
            itemPerPage: 0,
            days: [],
            nextLabel: "<div class='nav-carousel-next'></div>",
            prevLabel: "<div class='nav-carousel-prev'></div>",
            lat: 0,
            lon: 0,
            page: 0,
            saveUrl: [],
            selectedValue: '',
            currentPage: 0,
            ccc: 0,

            slide: 0,
            sliding: null
        }
    },
    methods: {
        onSlideEnd() {
            this.sliding = false
            console.log(this.slide);
            this.$router.push({ query: { name: this.selected.name, lat: this.lat, lon: this.lon, page: this.slide } }).catch(err => {console.log(err)})
        },
        // pageChange(i) { 
        //     this.currentPage = i;
        //     console.log(this.slide);
        //     this.$router.push({ query: { name: this.selected.name, lat: this.lat, lon: this.lon, page: this.currentPage } })
        // },
        getGeoApi(currentValue) {
        this.temp = [];
        this.time = [];
        if(currentValue.length <= 2) {
            this.options = [];
            this.temp = [];
        }else{
            this.$axios.get(`${config.geoApi}?apikey=${config.apiKeyGeo}&format=json&geocode=${currentValue}`)
            .then( response => {
            console.log(`${config.geoApi}?apikey=${config.apiKeyGeo}&format=json&geocode=${currentValue}`);

            this.geo = response.data.response.GeoObjectCollection.featureMember;
                
            this.geo.forEach(obj => {

                this.options.push(obj.GeoObject); // вытаскиваю все объекты с массива apі
                this.coord.push(obj.GeoObject.Point.pos); // вытаскиваю координаты
                    
            });
            console.log(this.options)
                
            })
        }
        
        },
        getWeatherApi(currentValue) {

            var coord = currentValue.Point.pos.split(" ");
            this.lon = coord[0];
            this.lat = coord[1];

            this.axiosWeatherApi();
            
        },
        axiosWeatherApi() {
            this.$axios.get(`${config.weatherApi}lat=${this.lat}&lon=${this.lon}&units=metric&appid=${config.apiKeyWeather}`)
            .then( response => {
            console.log(`${config.weatherApi}lat=${this.lat}&lon=${this.lon}&units=metric&appid=${config.apiKeyWeather}`);

            this.weather = response.data.list;

            this.weather.forEach(obj => {

                this.temp.push(obj.main.temp); // температура в Кельвинах за 5 дней (каждые 3 часа)
                this.time.push(obj.dt_txt); // дата и время (5 дней каждые 3 часа - 40 элементов по 8 элементов на целый день)
                    
            });

            this.displayWeather(this.weather);
            
            })
        },
        displayWeather(value) {
            let sliceIndex = 0;
            let sliceEnd;
            if (value && value.length) {
                this.errorWeatherData = false;
                this.weatherData = [];
                let currentDay = moment.unix(value[0].dt).utc().get('date'); // utc() - fix timezone                
                
               value.forEach( (item, index) => {
                    let itemDay = moment.unix(item.dt).utc().get('date'); // utc() - fix timezone
                    // console.log(index);
                    sliceEnd = index;
                    if (itemDay != currentDay) {
                        this.weatherData.push(value.slice(sliceIndex, sliceEnd));
                        currentDay = itemDay;
                        sliceIndex = index;
                    }
                });
                this.weatherData.push(value.slice(sliceIndex));
            } else {
                
                this.errorWeatherData = true;
                this.weatherData = [];
            }

            this.selectedValue = this.selected.name
            this.$router.push({ query: { name: this.selected.name, lat: this.lat, lon: this.lon, page: this.slide } }).catch(err => {console.log(err)})
            
        }
    },
    created() {
        if( this.$route.query.lat && this.$route.query.lon ) {
            
            this.selected.name = this.$route.query.name;
            this.lat = this.$route.query.lat;
            this.lon = this.$route.query.lon;

            this.selectedValue = this.$route.query.name; // value multiselect
            this.slide = Number(this.$route.query.page); // current slide
                        
            console.log(this.currentPage)

            this.axiosWeatherApi(); 

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import "~vue-multiselect/dist/vue-multiselect.min.css";

@mixin screen($media) {
  @if $media == 1330 {
    @media (max-width: 1330px) {@content};
  } 
}

.weather { 
    margin-top: 70px;
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

  .carousel {
    color: white;
}

.carousel-indicators li {
    outline: none;
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
    // background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
    // flex-wrap: wrap;
    @include screen(1330) {
        flex-wrap: wrap;
    }
  }

.example-slide div {
    // width: 100%;
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
            &:focus {
                outline: none;
            }
        }
        .VueCarousel-navigation-next {
            transform: translateY(-50%) translateX(-75%);
            transition: all 0.2s;
            &:focus {
                outline: none;
            }
        }
    }
}

.VueCarousel-dot {
    &:focus {
        outline: none !important;
    }
}

.VueCarousel-navigation-button {
    top: 51.35% !important;
}

.day::first-letter {
    text-transform: uppercase;
}

.nav-carousel-next {
    width: 20px;
    height: 20px;
    border-radius: 20%;
    border-bottom: 5px solid white;
    border-right: 5px solid white;
    transform: rotate(-45deg);
}

.nav-carousel-prev {
    width: 20px;
    height: 20px;
    border-radius: 20%;
    border-bottom: 5px solid white;
    border-right: 5px solid white;
    transform: rotate(135deg);
}

.weather-temp {
    font-family: 'Open Sans', sans-serif ;
}

// ----------------- new carousel

.carousel {
    position: relative;
}

.carousel-inner {
    position: unset; 
    bottom: 0;
    width: 100%;
    overflow: unset;
}

.carousel-caption {
    bottom: 0;
    top: 0;
}

.carousel-control-prev, .carousel-control-next {
    top: 200px;
}

.carousel-indicators {
    top: 345px;
    @include screen(1330) {
        top: 530px;
        margin-bottom: 90px;
    }
}

</style>
