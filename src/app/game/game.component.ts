import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;  // Variable heist game vom Typ Game(game.ts)

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();  // hier wird ein leeres JSON Array erstellt wo alle Eigenschaften aus Game.ts drin sind
    console.log(this.game);
  }


  takeCard() {
    if (!this.pickCardAnimation) {  // wird nur ausgeführt wenn pickCardAnimation false ist(! ist false)
      this.currentCard = this.game.stack.pop();  // das pop gibt uns den Letzten Wert des Array zurück und wird entfernt aus dem Array
    console.log(this.currentCard);
    this.pickCardAnimation = true;

    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1500);  // durch den Timeout können wir nur alle 1,5 sec eine neue Karte ziehen
    }
  }

}
