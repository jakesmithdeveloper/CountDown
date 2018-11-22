Vue.component('timer', {
	template: `
	<div>
		<div class="time-input">
			Hours: <input type="number" v-model="hoursIn">
			Minutes: <input type="number" v-model="minutesIn">
		</div>

		<div class="countdown">
			<h1><span>Hours: {{hours}} Minutes: {{minutes}} Seconds: {{seconds}}</span></h1>
			<button v-show="!active && totalTime == 0" @click="startTimer">Start</button>
			<button v-show="!active && totalTime > 0" @click="startTimer">Resume</button>
			<button v-show="active" @click="stopTimer">Stop</button>
			<button v-show="!active" @click="resetTimer">Reset</button>
		</div>
	</div>
	`,
	data() {
		return {
			action: null,
			hoursIn: 0,
			minutesIn: 0,
			totalTime: 0,
			active: false
		}
	},
	methods: {
		startTimer() {
			if (this.totalTime == 0) {
				this.totalTime = (this.hoursIn*3600) + (this.minutesIn*60);
			}
			this.active = true;
			this.action = setInterval(() => this.countDown(), 1000);
		},
		stopTimer() {
			this.active = false;
			clearInterval(this.action);
		},
		resetTimer() {
			this.totalTime = 0;
			this.hoursIn = 0;
			this.minutesIn = 0;
		},
		countDown(){
			if (this.totalTime == 1) {
				this.totalTime --;
				var alarm = new Audio('alarm.mp3');
				alarm.play();
				this.stopTimer();
				this.resetTimer();
			} else {
				this.totalTime --;
			}
			
		}
	},
	computed: {
		hours() {
			if (!this.totalTime) {
				return this.hoursIn;
			} else {
				return Math.trunc(this.totalTime / 3600);
			}
		},
		minutes() {
			if(!this.totalTime) {
				return this.minutesIn;
			} else {
				return Math.trunc((this.totalTime - (this.hours*3600))/60);
			}
		},
		seconds() {
			if (!this.totalTime) {
				return 0;
			} else {
				return this.totalTime - (this.hours*3600) - (this.minutes*60);
			}
		}
	}
})

var app = new Vue({
	el: '#app'
})