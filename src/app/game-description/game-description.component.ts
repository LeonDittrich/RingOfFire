import { Component, OnChanges, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss']
})
export class GameDescriptionComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title='';
  description='';
  @Input() card: string;  // eine Inputvariable vom Typ card


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {  // void bedeutet sie führt nur was aus und gibt nix zurück, die Funktion ngOnChances wird bei jeder veränderrung ausgeführt
    if (this.card) {  // führen wir nur aus wenn die Karte bereits existiert
      console.log('current card', this.card);
      let cardNumber = +this.card.split('_')[1];  // Mit dem + wandeln wir das String array in eine Number um, mit split spalten wir an dem _ die Karte in 2 Teile und mit [1] lesen wir das Array an stelle 1 aus was die Zahl ist
      this.title = this.cardAction[cardNumber - 1].title;  // title ist die Karte mit zb. der Nr 2 und das - zieht eins ab- da wir ja im array bei 0 anfangen zu Zählen aber die Karten mit der Zahl 1 Anfangen. Mit title holen wir uns den Titel 
      this.description = this.cardAction[cardNumber - 1].description;  // Hier das selbe, bloß das wir hier die Beschreibung uns holen
    }
  }

}
