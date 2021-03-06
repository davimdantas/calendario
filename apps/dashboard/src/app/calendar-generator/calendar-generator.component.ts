import { TestBed } from '@angular/core/testing';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-calendar-generator',
	templateUrl: './calendar-generator.component.html',
	styleUrls: ['./calendar-generator.component.scss']
})
export class CalendarGeneratorComponent implements OnInit {
	dateGenerated = new Date();

	currentlyDay = this.dateGenerated.getDate();
	currentlyMonth = this.dateGenerated.getMonth();
	// months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

	formattedMonth = this.months[this.currentlyMonth]
	currentlyYear = this.dateGenerated.getFullYear();
	UltimoDia = new Date(this.currentlyYear, this.currentlyMonth, 0);
	firstWDayOfMonth = (new Date(this.currentlyYear, this.currentlyMonth)).getDay();
	// daysOfMonth = 32 - new Date(this.currentlyYear, this.currentlyMonth, 32).getDate();
	daysOfMonth = new Date(this.currentlyYear, this.currentlyMonth, 0).getDate();


	firstDate = {
		year: this.dateGenerated.getUTCFullYear(),
		month: this.currentlyMonth + 1,
		day: this.currentlyDay
	}
	lastDate = {
		year: this.dateGenerated.getUTCFullYear(),
		month: this.currentlyMonth + 1,
		day: this.daysOfMonth
	}

	firstHour = 7;
	lastHour = 18;

	generatedDays = []


	calendarArray = []

	columnArray = []

	testeArray = []


	daysForTable = new BehaviorSubject(this.calendarArray)

	dataSource: Observable<any[]>;
	allowedDays = [0, 1, 2, 3, 4, 5, 6]


	dates = []

	// getDates(startDate, endDate) {
	// 	console.log('\n startDate: ', startDate);
	// 	var dt = new Date(startDate);
	// 	console.log('\n dt: ', dt);
	// 	while (dt <= endDate) {
	// 		this.dates.push(new Date(dt));
	// 		dt.setDate(dt.getDate() + 1);
	// 	}
	// };


	getDates(startDate, endDate) {
		while (startDate <= endDate) {
			var startDate1 = startDate.setDate(startDate.getDate() + 1);
			this.dates.push(new Date(startDate1));
		}
		// for (var eachday in this.dates) {

		// 	var createdDate = new Date(this.dates[eachday])
		// 	var dayOfWeekGetter = createdDate.getDay()
		// 	var daygetter = createdDate.getDate()
		// 	console.log('\n dayOfWeekGetter', daygetter);
		// 	// console.log('\n eachday: ', teste[eachday]);
		// }

	};




	// calendarGenerator(fHour, lHour, cDay, dOMonth) {
	calendarGenerator(fHour, lHour) {
		const newObj = {}
		for (var eachday in this.dates) {
			var createdDate = new Date(this.dates[eachday])
			var dayOfWeekGetter = createdDate.getDay()
			var monthGetter = createdDate.getMonth()


			var daygetter = createdDate.getDate() > 9 ? createdDate.getDate() : `0${createdDate.getDate()}`
			if (this.allowedDays.includes(dayOfWeekGetter)) {
				Object.defineProperty(newObj, `ar${daygetter}`, {
					value: `${daygetter} ${this.months[monthGetter]}`,
					writable: true,
					configurable: true,
					enumerable: true
				})
				const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
				const temporaryName = `ar${daygetter}`
				const temporaryObj = {
					columnDef: temporaryName,
					header: days[dayOfWeekGetter],
					cell: function (column) {
						return `${column[temporaryName]}`
					}
				}
				this.columnArray.push(temporaryObj)
			}
		}
		this.calendarArray.push(newObj)



		for (let i = fHour; i <= lHour; i++) {
			const j = String(i)
			const newObj2 = {}
			for (var day in this.columnArray) {
				const h = this.columnArray[day].columnDef[2] + this.columnArray[day].columnDef[3]
				Object.defineProperty(newObj2, `ar${h}`, {
					value: `${i < 10 ? 0 + j : j}:00`,
					writable: true,
					configurable: true,
					enumerable: true
				}
				)
			}
			this.calendarArray.push(newObj2)
		}
	}

	updateDays(changes) {
		this.firstHour = this.timeStringToInt(changes[2])
		this.lastHour = this.timeStringToInt(changes[3])
		this.allowedDays = []
		this.allowedDays = changes[4]
		this.dates = []
		this.columnArray = []
		this.calendarArray = []
		this.generatedDays = []
		this.getDates(new Date(changes[0].year, changes[0].month, changes[0].day), new Date(changes[1].year, changes[1].month, changes[1].day));
		this.daysForTable = new BehaviorSubject(this.calendarArray)

		this.calendarGenerator(this.firstHour, this.lastHour)

		this.columnArray.map((day) => this.generatedDays.push(day.columnDef))

		this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)))
	}

	timeStringToInt(time) {
		var hoursMinutes = time.split(/[.:]/);
		var hours = parseInt(hoursMinutes[0], 10);
		// var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
		return hours
	}



	constructor() { }

	ngOnInit() {
		this.getDates(new Date(this.currentlyYear, this.currentlyMonth, this.currentlyDay), new Date(2019, 1, 21));
		this.calendarGenerator(this.firstHour, this.lastHour)
		this.columnArray.map((day) => this.generatedDays.push(day.columnDef))
		this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)))


	}

}




