import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
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
    this.pickCardAnimation = true;
  }

}
