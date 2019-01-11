import { Component, OnInit } from '@angular/core';
import { getLocaleDayNames } from '@angular/common';
import { stringify } from '@angular/core/src/render3/util';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	dateGenerated = new Date();
	currentlyDay = this.dateGenerated.getDate();
	currentlyMonth = this.dateGenerated.getMonth();
	months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	formattedMonth = this.months[this.currentlyMonth]
	currentlyYear = this.dateGenerated.getFullYear();
	firstWDayOfMonth = (new Date(this.currentlyYear, this.currentlyMonth)).getDay();
	daysOfMonth = 32 - new Date(this.currentlyYear, this.currentlyMonth, 32).getDate();
	generatedMonth = [];
	firstHour = 7;
	lastHour = 18;
	generatedHours = []
	options = { weekday: 'long' };
	projects = [
		{
			id: '1',
			title: 'Project One',
			details: 'This is a sample project',
			percentComplete: 20,
			approved: false,
		},
		{
			id: '2',
			title: 'Project Two',
			details: 'This is a sample project',
			percentComplete: 40,
			approved: false,
		},
		{
			id: '3',
			title: 'Project Three',
			details: 'This is a sample project',
			percentComplete: 100,
			approved: true,
		}
	];
	selectedProject;

	constructor() { }

	ngOnInit() {

		for (let i = this.currentlyDay; i <= this.daysOfMonth; i++) {
			const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
			const weekDayGetter = (new Date(this.currentlyYear, this.currentlyMonth, i)).getDay()
			const day = {
				day: i,
				weekDay: days[weekDayGetter]
			}
			this.generatedMonth.push(day);
		}
		for (let i = this.firstHour; i <= this.lastHour; i++) {
			const j = String(i)
			const myobj = {
				hour: `${i < 10 ? 0 + j : j}:00`
			}
			this.generatedHours.push(myobj)
		}
	}
	selectProject(project) {
		this.selectedProject = project;
		console.log("​ProjectsComponent -> selectProject -> selectedProject", this.selectedProject)

	}

}
