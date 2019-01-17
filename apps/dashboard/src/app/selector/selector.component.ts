import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { CalendarGeneratorComponent } from '../calendar-generator/calendar-generator.component'


class changesForTable {
	constructor(
		public horaI: string,
		public horaF: string,

	) { }
}


@Component({
	selector: 'app-selector',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {


	hoveredDate: NgbDate;

	fromDate: NgbDate;
	toDate: NgbDate;

	@Input() firstDay

	@Input() lastDay

	dateArray = []

	submitted: boolean = false;

	mudancas = new changesForTable('', '');

	constructor(config: NgbDatepickerConfig, calendar: NgbCalendar) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
		config.outsideDays = 'hidden';
		// console.log('\n Antes: ', this.fromDate, ' | ', this.toDate);
	}

	onSubmit() {
		this.submitted = true;
	}
	saveHour(hour) {
		console.log('\n aqui ', hour);
	}

	getCurrentModel() {
		return JSON.stringify(this.mudancas);
	}


	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
		// const myEvent = new EventEmitter();
		// console.log('\n Depois: ', this.fromDate, ' | ', this.toDate);
		this.dateArray = []
		if (this.toDate && this.fromDate) {
			this.dateArray.push(this.fromDate.day, this.toDate.day)

		}
	}


	isHovered(date: NgbDate) {
		return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
	}

	isInside(date: NgbDate) {
		return date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);

	}

	@Output() clicked = new EventEmitter()

	updateDates() {
		this.dateArray.push(this.mudancas.horaI, this.mudancas.horaF)
		this.clicked.emit(this.dateArray)
	}



	ngOnInit() {
	}



}