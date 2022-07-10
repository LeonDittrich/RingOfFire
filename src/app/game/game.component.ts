import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PleaseAddNewPlayerComponent } from '../please-add-new-player/please-add-new-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;  // Variable heist game vom Typ Game(game.ts)
  games$: Observable<any>;
  todos: Array<any>;
  gameID: string;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {  // hier aboniere ich die URL Parameter
      console.log('die Parameter',params['id']);
      this.gameID = params['id'];


      this
      .firestore
      .collection('games') //zugriff auf Database Sammlung
      .doc(this.gameID) // hier ziehen wir die ID aus der Samlung, 
      .valueChanges()
      .subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
     
    });
  
  }


  newGame() {
    this.game = new Game();  // hier wird ein leeres JSON Array erstellt wo alle Eigenschaften aus Game.ts drin sind
    console.log('Alle game.ts Arrays', this.game);
  }


  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {  // wird nur ausgeführt wenn pickCardAnimation false ist(! ist false)
      this.game.currentCard = this.game.stack.pop();  // das pop gibt uns den Letzten Wert des Array zurück und wird entfernt aus dem Array
      this.game.pickCardAnimation = true;
      console.log('New Card:' + this.game.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;  // Erhöht nach dem Karteziehen die Currentplay Zahl, damit wir den Spieler wechseln
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;  // Hier verwenden wir Modulo somit kann die Zahl nicht Größer sein als die Zahl im  Arry und wir starten wieder bei 0

      this.saveGame();  // Speichern die Gezogene Karte und den Spieler der dran ist ab
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();  // Zeigt die Karte wieder an
      }, 1000);  // durch den Timeout können wir nur aller 1 sec eine neue Karte ziehen
    }else if(this.game.players.length < 2) {
      this.openPleaseAddNewPlayerDialog()
    }
  }


  openDialog(): void {  // Fügt Spieler hinzu
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {  // Zuerst schaueb wir ob die Variable name existiert, wenn ja überprüfen wir ob die Buchstabenlänge von name größer als 0 ist, dann fügt es den Spieler ein
        this.game.players.push(name);  // Hier fügen wir den namen den wir eingegeben haben im Dialogfeld in das Array game.players ein
        this.saveGame();  // Speichert nach dem Hinzufügen des Spieler das Spiel ab und somit den Spieler
      }
    });
  }


  saveGame() {
    this
      .firestore
      .collection('games') //zugriff auf Database Sammlung
      .doc(this.gameID)
      .update(this.game.toJson()); 
  }


  openPleaseAddNewPlayerDialog() {
    this.dialog.open(PleaseAddNewPlayerComponent);
  }
}
