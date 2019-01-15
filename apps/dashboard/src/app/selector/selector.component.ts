import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';
import { DataSource } from '@angular/cdk/collections';
import { of } from 'rxjs';



@Component({
	selector: 'app-selector',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
	dateGenerated = new Date();
	currentlyDay = this.dateGenerated.getDate();
	currentlyMonth = this.dateGenerated.getMonth();
	months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	formattedMonth = this.months[this.currentlyMonth]
	currentlyYear = this.dateGenerated.getFullYear();
	firstWDayOfMonth = (new Date(this.currentlyYear, this.currentlyMonth)).getDay();
	daysOfMonth = 32 - new Date(this.currentlyYear, this.currentlyMonth, 32).getDate();
	generatedMonth = [];
	firstHour = 6;
	lastHour = 18;
	generatedHours = []
	generatedDays = []


	teste = []

	novoarray = []

	daysForTable = new BehaviorSubject(this.teste)

	dataSource: Observable<any[]>;
	columns = []


	constructor() { }

	ngOnInit() {
		for (let i = this.firstHour; i <= this.lastHour; i++) {
			const j = String(i)
			this.generatedHours.push(`${i < 10 ? 0 + j : j}:00`)

			const newObj = {}
			for (let h = this.currentlyDay; h <= this.daysOfMonth; h++) {
				Object.defineProperty(newObj, `ar${h}`, {
					value: `${i < 10 ? 0 + j : j}:00`,
					writable: true,
					configurable: true,
					enumerable: true
				}
				)
			}
			this.teste.push(newObj)


		}

		for (let i = this.currentlyDay; i <= this.daysOfMonth; i++) {
			const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
			const weekDayGetter = (new Date(this.currentlyYear, this.currentlyMonth, i)).getDay()
			const temporaryObj = {
				monthDay: `${i}`,
				weekDay: days[weekDayGetter],
				hours: this.generatedHours
			}
			const collumnTemplate = {
				columnDef: `${i}`,
				header: days[weekDayGetter],
				schedule: (element2) => `${element2.hours}`,
			}
			this.generatedMonth.push(temporaryObj)
			this.columns.push(collumnTemplate)

			this.generatedDays.push(`ar${i}`)


		}
		for (let iterator = this.currentlyDay; iterator <= this.daysOfMonth; iterator++) {
			const days1 = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
			const weekDayGetter1 = (new Date(this.currentlyYear, this.currentlyMonth, iterator)).getDay()
			const contador = iterator
			const temporaryObj1 = {
				columnDef: `ar${iterator}`,
				header: days1[weekDayGetter1],
				cell: function (element3) {
					console.log('Chamada');
					const teste = `ar${contador}`
					console.log('\n', element3);
					return `${element3[teste]}`
				}

			}

			this.novoarray.push(temporaryObj1)
		}
		this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)))
	}


}




