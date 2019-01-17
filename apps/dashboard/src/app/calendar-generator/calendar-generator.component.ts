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
	months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	formattedMonth = this.months[this.currentlyMonth]
	currentlyYear = this.dateGenerated.getFullYear();
	firstWDayOfMonth = (new Date(this.currentlyYear, this.currentlyMonth)).getDay();
	daysOfMonth = 32 - new Date(this.currentlyYear, this.currentlyMonth, 32).getDate();

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


	daysForTable = new BehaviorSubject(this.calendarArray)

	dataSource: Observable<any[]>;


	calendarGenerator(fHour, lHour, cDay, dOMonth) {
		const newObj = {}
		for (let k = cDay; k <= dOMonth; k++) {
			Object.defineProperty(newObj, `ar${k}`, {
				value: `${k}`,
				writable: true,
				configurable: true,
				enumerable: true
			})


			const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
			const dayOfWeekGetter = (new Date(this.currentlyYear, this.currentlyMonth, k)).getDay()
			const temporaryName = `ar${k}`
			const temporaryObj = {
				columnDef: temporaryName,
				header: days[dayOfWeekGetter],
				// cell: (column) => `${column[`ar${k}`]}`
				cell: function (column) {
					return `${column[temporaryName]}`
				}
			}
			this.columnArray.push(temporaryObj)
		}
		this.calendarArray.push(newObj)

		// for (let i = fHour; i <= lHour; i++) {
		// 	const j = String(i)
		// 	const newObj2 = {}
		// 	// this.generatedHours.push(`${i < 10 ? 0 + j : j}:00`)
		// 	for (let h = cDay; h <= dOMonth; h++) {
		// 		Object.defineProperty(newObj2, `ar${h}`, {
		// 			value: `${i < 10 ? 0 + j : j}:00`,
		// 			writable: true,
		// 			configurable: true,
		// 			enumerable: true
		// 		}
		// 		)
		// 	}
		// 	this.calendarArray.push(newObj2)
		// }

		for (let i = fHour; i <= lHour; i++) {
			const j = String(i)
			const newObj2 = {}
			// this.generatedHours.push(`${i < 10 ? 0 + j : j}:00`)
			for (var day in this.columnArray) {
				const h = this.columnArray[day].columnDef[2] + this.columnArray[day].columnDef[3]
				// for (let h = cDay; h <= dOMonth; h++) {
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
		this.firstDate.day = changes[0]
		this.lastDate.day = changes[1]
		this.firstHour = this.timeStringToInt(changes[2])
		this.lastHour = this.timeStringToInt(changes[3])


		this.columnArray = []
		this.calendarArray = []
		this.generatedDays = []
		this.daysForTable = new BehaviorSubject(this.calendarArray)

		this.calendarGenerator(this.firstHour, this.lastHour, this.firstDate.day, this.lastDate.day)

		// this.columnGenerator(this.firstDate.day, this.lastDate.day)
		this.columnArray.map((day) => this.generatedDays.push(day.columnDef))

		this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)))


	}

	timeStringToInt(time) {
		var hoursMinutes = time.split(/[.:]/);
		var hours = parseInt(hoursMinutes[0], 10);
		// var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
		return hours
	}
	// columnGenerator(cDay, dOM) {
	// 	for (let iterador = cDay; iterador <= dOM; iterador++) {
	// 		const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
	// 		const dayOfWeekGetter = (new Date(this.currentlyYear, this.currentlyMonth, iterador)).getDay()
	// 		const temporaryObj = {
	// 			columnDef: `ar${iterador}`,
	// 			header: days[dayOfWeekGetter],
	// 			cell: function (column) {
	// 				return `${column[`ar${iterador}`]}`
	// 			}

	// 		}
	// 		this.columnArray.push(temporaryObj)
	// 	}

	// }



	// cleanArray(days) {
	//   const calendarFiltered = this.calendarArray.filter((day) => day.header === days)
	//   // this.calendarArray.map((day) => day.header === days ? this.calendarArray.pop() : "QualquerCoisa")
	//   this.calendarArray = calendarFiltered
	// }



	constructor() { }

	ngOnInit() {
		this.calendarGenerator(this.firstHour, this.lastHour, this.currentlyDay, this.daysOfMonth)
		// this.columnGenerator(this.currentlyDay, this.daysOfMonth)
		this.columnArray.map((day) => this.generatedDays.push(day.columnDef))
		this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)))

	}

}



